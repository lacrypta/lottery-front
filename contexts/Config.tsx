import { createContext, useEffect, useState } from "react";
import { db, doc, onSnapshot } from "../lib/firebase";

interface IConfigContext {
  loaded: boolean;
  totalPlayers?: number;
  getBlockApiKey?: string;
  blockTarget?: number;
  totalWinners?: number;
  lotteryDelay?: number;
  staggeringDelay?: number;
}

export const ConfigContext = createContext<IConfigContext>({
  loaded: false,
});

interface IConfigProviderProps {
  children: any;
}

const configRef = doc(db, "config", "main");

export const ConfigProvider = ({ children }: IConfigProviderProps) => {
  const [totalPlayers, setTotalPlayers] = useState<number>(0);
  const [blockTarget, setBlockTarget] = useState<number>(0);
  const [getBlockApiKey, setGetBlockApiKey] = useState<string>();
  const [totalWinners, setTotalWinners] = useState<number>();
  const [staggeringDelay, setStaggeringDelay] = useState<number>(60);
  const [lotteryDelay, setLotteryDelay] = useState<number>();

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    onSnapshot(configRef, {
      next: (snapshot) => {
        const config = snapshot.data();
        setBlockTarget(config?.blockTarget);
        setTotalPlayers(config?.players);
        setGetBlockApiKey(config?.getBlockApiKey);
        setTotalWinners(config?.totalWinners);
        setLotteryDelay(config?.lotteryDelay);
        setStaggeringDelay(config?.staggeringDelay);

        setLoaded(true);
      },
    });
  }, []);

  return (
    <ConfigContext.Provider
      value={{
        totalPlayers,
        blockTarget,
        getBlockApiKey,
        loaded,
        totalWinners,
        lotteryDelay,
        staggeringDelay,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
