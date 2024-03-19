import { EventEmitter } from "events";
import { useEffect, useState } from "react";
import { Nomad } from "../lib/nomad/Nomad";
import { relayInit } from "nostr-tools";

interface UseNomadReturn {
  nomad?: Nomad;
  loaded: boolean;
  loading: boolean;
  eventEmitter: EventEmitter;
}

interface UseNomadOptions {}

export const useNomad = <T>(
  idOrHandle: string,
  options?: UseNomadOptions
): UseNomadReturn & T => {
  const [nomad, setNomad] = useState<Nomad>();
  const [eventEmitter] = useState<EventEmitter>(new EventEmitter());
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadNomad = async (idOrHandle: string) => {
    if (loaded || loading) {
      console.warn("Nomad already loaded or loading");
      return;
    }
    const relay = relayInit("wss://nos.lol/");
    await relay.connect();
    const nomad = await Nomad.fromHandleOrEventId(
      idOrHandle,
      relay,
      eventEmitter
    );
    nomad.init();
    setLoaded(true);
    setNomad(nomad);
  };

  useEffect(() => {
    loadNomad(idOrHandle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idOrHandle]);

  return {
    nomad,
    loaded,
    loading,
    eventEmitter,
    ...(nomad?.nomadRuntime?.getRuntimeInterface<T>() as T),
  };
};
