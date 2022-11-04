import { createContext, useEffect, useState } from "react";
import { Player } from "../types/players";

interface IPlayersContext {
  total?: number;
  players: Player[];
  getWinners: () => void;
}

export const PlayersContext = createContext<IPlayersContext>({
  players: [],
  getWinners: () => {},
});

interface IPlayersProviderProps {
  children: any;
}

const generateBlankPlayers = (total: number) => {
  const res: Player[] = [];
  for (let id = 1; id < total; id++) {
    res.push({
      id,
      winner: false,
    });
  }
  return res;
};

const getResults = () => {};

export const PlayersProvider = ({ children }: IPlayersProviderProps) => {
  const [total, setTotal] = useState<number>(60);
  const [players, setPlayers] = useState<Player[]>([]);

  const getWinners = () => {
    console.info("Needs to implement Get Winners!");
  };

  useEffect(() => {
    setPlayers(generateBlankPlayers(total));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PlayersContext.Provider value={{ total, players, getWinners }}>
      {children}
    </PlayersContext.Provider>
  );
};
