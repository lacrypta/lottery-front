import { createContext, useEffect, useState } from "react";

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
  const [total, setTotal] = useState<number>(80);
  const [winners, setWinners] = useState<number[]>([]);

  const getWinners = () => {
    console.info("Needs to implement Get Winners!");
    // setWinners();
  };

  return (
    <PlayersContext.Provider value={{ total, winners, getWinners }}>
      {children}
    </PlayersContext.Provider>
  );
};
