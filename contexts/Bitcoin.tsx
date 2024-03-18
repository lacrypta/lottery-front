import { createContext, useContext, useEffect, useState } from "react";
import { ConfigContext } from "./Config";
import useBlockcypher from "../hooks/useBlockcypher";

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
  const { blockTarget } = useContext(ConfigContext);
  const { blockHash, blockHeight, getBlockHash, close } = useBlockcypher();
  const [currentBlockHeight, setCurrentBlockHeight] = useState<number>(0);
  const [currentBlockHash, setCurrentBlockHash] = useState<string>("");

  useEffect(() => {
    if (blockTarget && blockHeight && blockHash) {
      // If the blockHeight is greater than the blockTarget, we need to fetch the blockHash
      if (blockHeight > blockTarget) {
        getBlockHash(blockTarget).then((hash) => {
          setCurrentBlockHash(hash);
          setCurrentBlockHeight(blockTarget);
        });
      } else if (blockHeight === blockTarget) {
        setCurrentBlockHash(blockHash);
        setCurrentBlockHeight(blockHeight);
      }

      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockTarget, blockHeight, blockHash, close]);

  return (
    <BitcoinContext.Provider
      value={{ blockNumber: currentBlockHeight, blockHash: currentBlockHash }}
    >
      {children}
    </BitcoinContext.Provider>
  );
};
