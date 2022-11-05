import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createContext, useContext, useEffect, useState } from "react";
import { getBlockCount, getBlockHash } from "../lib/getblock";
import { ConfigContext } from "./Config";

interface IBitcoinContext {
  blockNumber: number;
  blockHash?: string;
}

export const BitcoinContext = createContext<IBitcoinContext>({
  blockNumber: 0,
});

interface IBitcoinProviderProps {
  children: any;
}

export const BitcoinProvider = ({ children }: IBitcoinProviderProps) => {
  const { blockTarget, getBlockApiKey } = useContext(ConfigContext);
  const [blockNumber, setBlockNumber] = useState<number>(0);
  const [blockHash, setBlockHash] = useState<string>();
  const [listening, setListening] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    if (listening || !blockTarget || !getBlockApiKey) {
      return;
    }
    setListening(true);

    const _interval = setInterval(() => {
      refreshBlock();
    }, 5000);

    async function refreshBlock() {
      if (!getBlockApiKey || finished) {
        return;
      }
      const currentBlock = Math.min(
        await getBlockCount(getBlockApiKey),
        blockTarget || 0
      );
      if (blockTarget && currentBlock >= blockTarget) {
        setBlockHash(await getBlockHash(blockTarget, getBlockApiKey));
        setFinished(true);
        clearInterval(_interval);
      }
      setBlockNumber(currentBlock);
    }

    refreshBlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockTarget, getBlockApiKey, listening, finished]);
  return (
    <BitcoinContext.Provider value={{ blockNumber, blockHash }}>
      {children}
    </BitcoinContext.Provider>
  );
};
