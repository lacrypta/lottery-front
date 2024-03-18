import { useEffect, useState } from "react";
import { Nomad } from "../lib/nomad/Nomad";
import { relayInit } from "nostr-tools";

interface UseNomadReturn {
  nomad?: Nomad;
}

interface UseNomadOptions {}

export const useNomad = <T>(
  idOrHandle: string,
  options?: UseNomadOptions
): UseNomadReturn & T => {
  const [nomad, setNomad] = useState<Nomad>();

  const loadNomad = async (idOrHandle: string) => {
    const relay = relayInit("wss://nos.lol/");
    await relay.connect();
    const nomad = await Nomad.fromHandleOrEventId(idOrHandle, relay);
    nomad.init();
    setNomad(nomad);
  };

  useEffect(() => {
    loadNomad(idOrHandle);
  }, [idOrHandle]);

  return {
    nomad,
    ...(nomad?.nomadRuntime?.getRuntimeInterface<T>() as T),
  };
};
