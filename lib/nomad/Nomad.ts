import { EventEmitter } from "events";

// Types
import type { Event, Relay } from "nostr-tools";
import type { NomadHandle, NomadRepoManifest } from "./types/nomad";
import { NomadKinds } from "./types/kinds";
import { NomadRuntime } from "./NomadRuntime";

export class Nomad {
  authorPubkey: string;
  codeEvent: Event;
  repoManifest?: NomadRepoManifest;
  nomadRuntime: NomadRuntime | undefined;

  // Not yet implemented
  dependencies: { [name: string]: Nomad } = {};

  public eventEmitter: EventEmitter = new EventEmitter();
  public eventId: string;

  constructor(codeEvent: Event, repoManifest?: NomadRepoManifest) {
    this.codeEvent = codeEvent;
    this.authorPubkey = codeEvent.pubkey;
    this.repoManifest = repoManifest;
    this.eventId = codeEvent.id;
  }

  async init<T>(...args: any[]): Promise<T> {
    this.nomadRuntime = new NomadRuntime(
      this.codeEvent.content,
      this.dependencies,
      this.eventEmitter,
      args
    );

    try {
      await this.nomadRuntime.init();
    } catch (e) {
      console.error(e);
      throw new Error("Error initializing Nomad Runtime");
    }

    this.eventEmitter.emit("nomad:init", args);

    return this.nomadRuntime.getRuntimeInterface<T>();
  }

  async call<T>(name: string, ...args: any[]): Promise<T> {
    this.eventEmitter.emit("nomad:call", [name, ...args]);

    if (this.nomadRuntime === undefined) {
      throw new Error(
        "Nomad Runtime not yet initialized. Please call init() first"
      );
    }

    return await this.nomadRuntime.call(name, ...args);
  }

  static async fromHandle(handleString: string, relay: Relay) {
    const handle = parseHandle(handleString);
    const authorPubkey = await getHandlePubkey(handle!);
    const repoManifest = await getRepoManifest(
      authorPubkey,
      handle!.repo,
      relay
    );

    // TODO: Proper sorting
    const versions = Object.keys(repoManifest.versions).sort();
    const latestVersion = versions[versions.length - 1];

    const selectedVersion =
      versions.find((v) => v === handle!.version) || latestVersion;
    const eventId = repoManifest.versions[selectedVersion];

    const codeEvent = await getCodeEvent(eventId, relay);

    return new Nomad(codeEvent, repoManifest);
  }

  static async fromEventId(eventId: string, relay: Relay) {
    const codeEvent = await getCodeEvent(eventId, relay);
    return new Nomad(codeEvent);
  }

  static async fromHandleOrEventId(handleOrEventId: string, relay: Relay) {
    if (handleOrEventId.includes("@")) {
      return this.fromHandle(handleOrEventId, relay);
    } else {
      return this.fromEventId(handleOrEventId, relay);
    }
  }
}

export function parseHandle(handle: string): NomadHandle | null {
  // Define the regular expression with capturing groups
  const regex =
    /^(?:([a-zA-Z0-9]+)@)?(.+)\/([a-zA-Z0-9]+)(?:@(latest|\d+(?:\.\d+)*))?$/;
  const match = handle.match(regex);

  if (match) {
    // Extract matched groups with destructuring
    const [, username, domainWithTLD, repo, version] = match;

    return {
      username,
      domain: domainWithTLD,
      repo,
      version,
    };
  } else {
    return null;
  }
}

export async function getHandlePubkey(handle: NomadHandle): Promise<string> {
  const res = await fetch(
    `https://${handle.domain}/.well-known/nostr.json?name=${handle.username}`
  );
  const data = await res.json();

  return data.names[handle.username!] as string;
}

export async function getRepoManifest(
  authorPubkey: string,
  repoName: string,
  relay: Relay
): Promise<NomadRepoManifest> {
  const event = await relay.get({
    authors: [authorPubkey],
    "#d": [`repo:${repoName}`],
    kinds: [NomadKinds.REPO_MANIFEST],
  });

  if (!event) {
    throw new Error("Repo manifest not found");
  }

  const versions: { [key: string]: string } = {};
  event.tags
    .find((tag) => tag[0].startsWith("version:"))
    ?.forEach((tag) => {
      const version = tag[0].split(":")[1];
      const eventId = tag[1];
      versions[version] = eventId;
    });

  return {
    name: repoName,
    description: event.tags.find((tag) => tag[0] === "description")?.[1] || "",
    versions: versions,
    event: event,
  };
}

export async function getCodeEvent(
  eventId: string,
  relay: Relay
): Promise<Event> {
  const event = await relay.get({
    ids: [eventId],
  });

  if (!event) {
    throw new Error("Code Event not found");
  }

  if (event.kind !== NomadKinds.NOMAD_CODE) {
    throw new Error(
      `Invalid event kind. Expecting ${NomadKinds.NOMAD_CODE} but got ${event.kind}`
    );
  }

  return event;
}
