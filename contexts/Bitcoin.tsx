import { createContext, useEffect, useState } from "react";

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
  const [blockNumber, setBlockNumber] = useState<number>(761690);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlockNumber((n) => ++n);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <BitcoinContext.Provider value={{ blockNumber }}>
      {children}
    </BitcoinContext.Provider>
  );
};
