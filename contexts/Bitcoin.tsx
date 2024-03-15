import { createContext, useContext, useEffect, useState } from "react";
import { ConfigContext } from "./Config";
import useMempool from "../hooks/useMempool";
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

  const { md5 } = useNomad("fierillo@lacrypta.ar/sha2", { params: "asda" });

  md5;

  md5("asdada");

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
  }, [blockTarget, blockHeight, close]);

  return (
    <BitcoinContext.Provider
      value={{ blockNumber: currentBlockHeight, currentBlockHash }}
    >
      {children}
    </BitcoinContext.Provider>
  );
};
