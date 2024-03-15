import { Relay } from "nostr-tools";
import { NomadHandle, NomadRepoManifest } from "./types/nomad";

class Nomad {
  name: string;
  constructor(eventId: string) {
    this.name = "Nomad";
  }

  static async fromHandle(handle: string) {}
}

async function resolveHandle(idOrName: string) {
  const str = idOrName.toLocaleLowerCase().trim();
  const handle = parseHandle(str);

  // Not a handle, validate ID
  if (!handle) {
    return str;
  }

  // Validate ID
  const regex = /^[a-f0-9]{64}$/;
  if (!str.match(regex)) {
    throw new Error("Invalid ID");
  }

  // Start resolving handle
}

function parseHandle(handle: string): NomadHandle | null {
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

async function getHandlePubkey(handle: NomadHandle): Promise<string> {
  const res = await fetch(
    `https://${handle.domain}/.well-known/nostr.json?name=${handle.username}`
  );
  const data = await res.json();

  return data.names[handle.username!] as string;
}

async function getRepoManifest(
  authorPubkey: string,
  repoName: string,
  relay: Relay
): Promise<NomadRepoManifest> {
  return data;
}
