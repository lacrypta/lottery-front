import { createContext, useContext, useEffect, useState } from "react";
import { ConfigContext } from "./Config";

interface IPlayersContext {
  total: number;
  winners?: number[];
  getWinners: () => void;
}

export const PlayersContext = createContext<IPlayersContext>({
  total: 0,
  getWinners: () => {},
});

interface IPlayersProviderProps {
  children: any;
}

export const PlayersProvider = ({ children }: IPlayersProviderProps) => {
  const { totalPlayers, totalWinners } = useContext(ConfigContext);
  const [winners, setWinners] = useState<number[]>([]);

  const getWinners = () => {
    console.info("Needs to implement Get Winners!");
    const _winners = [];
    for (let i = 0; i < (totalWinners || 0); i++) {
      _winners.push(Math.round(Math.random() * (totalPlayers || 0)));
    }
    setWinners(_winners);
  };

  return (
    <PlayersContext.Provider
      value={{ total: totalPlayers || 1, winners, getWinners }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
