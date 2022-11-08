import { createContext, useEffect, useState } from "react";
import { db, doc, onSnapshot } from "../lib/firebase";
import { Config } from "../types/config";

interface IConfigContext {
  loaded: boolean;
  totalPlayers?: number;
  getBlockApiKey?: string;
  blockTarget?: number;
  totalWinners?: number;
  lotteryDelay?: number;
  staggeringDelay?: number;
  config?: Config;
}

export const ConfigContext = createContext<IConfigContext>({
  loaded: false,
});

interface IConfigProviderProps {
  children: any;
}

const configRef = doc(db, "config", "main");

export const ConfigProvider = ({ children }: IConfigProviderProps) => {
  const [config, setConfig] = useState<Config>();

  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    onSnapshot(configRef, {
      next: (snapshot) => {
        const data = snapshot.data() as Config;
        setConfig(data);
        setLoaded(true);
      },
    });
  }, []);

  const {
    totalPlayers,
    blockTarget,
    getBlockApiKey,
    totalWinners,
    lotteryDelay,
    staggeringDelay,
  } = config || {};

  return (
    <ConfigContext.Provider
      value={{
        config,
        loaded,

        totalPlayers,
        blockTarget,
        getBlockApiKey,
        totalWinners,
        lotteryDelay,
        staggeringDelay,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
