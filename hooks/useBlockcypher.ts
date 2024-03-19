import { useCallback, useEffect, useState } from "react";

const TOKEN = process.env.NEXT_PUBLIC_BLOCKCYPHER_APIKEY;

interface UseMempoolReturn {
  blockHeight?: number;
  blockHash?: string;
  getBlockHash: (blockHeight: number) => Promise<string>;
  close: () => void;
}

const useBlockcypher = (): UseMempoolReturn => {
  const [blockHeight, setBlockHeight] = useState<number | undefined>();
  const [blockHash, setBlockHash] = useState<string | undefined>();
  const [ws, setWs] = useState<WebSocket>();

  const getBlockHash = useCallback(
    async (blockHeight: number): Promise<string> => {
      const res = await fetch(
        `https://api.blockcypher.com/v1/btc/main/blocks/${blockHeight}?txstart=1&limit=1`
      );
      const data = await res.json();

      return data.hash;
    },
    []
  );

  const getChainEndpoint = useCallback(async () => {
    const res = await fetch(
      `https://api.blockcypher.com/v1/btc/main?token=${TOKEN}`
    );
    const data = await res.json();

    setBlockHeight(data.height);
    setBlockHash(data.hash);
  }, []);

  const close = useCallback(() => {
    if (ws) {
      ws.onmessage = null;
      ws.onopen = null;
      ws.close();
    }
  }, [ws]);

  // On Mount
  useEffect(() => {
    setWs(
      new WebSocket(`wss://socket.blockcypher.com/v1/btc/main?token=${TOKEN}`)
    );

    getChainEndpoint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Start Websocket listeners
  useEffect(() => {
    if (!ws) {
      return;
    }

    ws.onopen = function () {
      ws.send(JSON.stringify({ event: "new-block" }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.dir(data);
      setBlockHash(data.hash);
      setBlockHeight(data.height);
    };
  }, [ws]);

  return {
    blockHash,
    blockHeight,
    getBlockHash,
    close,
  };
};

export default useBlockcypher;
