import { createContext, useEffect, useState } from "react";
import { db, doc, onSnapshot } from "../lib/firebase";

interface IConfigContext {
  loaded: boolean;
  totalPlayers?: number;
  getBlockApiKey?: string;
  blockTarget?: number;
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
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    onSnapshot(configRef, {
      next: (snapshot) => {
        const config = snapshot.data();
        setBlockTarget(config?.blockTarget);
        setTotalPlayers(config?.players);
        setGetBlockApiKey(config?.getBlockApiKey);
        setLoaded(true);
      },
    });
  }, []);

  return (
    <ConfigContext.Provider
      value={{ totalPlayers, blockTarget, getBlockApiKey, loaded }}
    >
      {children}
    </ConfigContext.Provider>
  );
};
