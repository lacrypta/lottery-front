import { createContext, useState } from "react";

interface IBitcoinContext {
  blockNumber: number;
}

export const BitcoinContext = createContext<IBitcoinContext>({
  blockNumber: 0,
});

interface IBitcoinProviderProps {
  children: any;
}

export const BitcoinProvider = ({ children }: IBitcoinProviderProps) => {
  const [blockNumber, setBlockNumber] = useState<number>(0);

  return (
    <BitcoinContext.Provider value={{ blockNumber }}>
      {children}
    </BitcoinContext.Provider>
  );
};
