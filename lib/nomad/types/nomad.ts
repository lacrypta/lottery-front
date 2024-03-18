import { Event } from "nostr-tools";

export interface NomadHandle {
  username?: string;
  domain: string;
  repo: string;
  version?: string;
}

export interface NomadRepoManifest {
  name: string;
  description: string;
  versions: { [key: string]: string };
  event: Event;
}
