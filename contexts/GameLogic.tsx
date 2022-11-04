import { createContext, useContext, useEffect, useState } from "react";
import { BitcoinContext } from "./Bitcoin";
import { PlayersContext } from "./Players";
import { StepsContext } from "./Steps";

interface IGameLogicContext {}

export const GameLogicContext = createContext<IGameLogicContext>({});

interface IGameLogicProviderProps {
  children: any;
}

const BLOCK_HIT = parseInt(process.env.NEXT_PUBLIC_BLOCK_START || "0");

export const GameLogicProvider = ({ children }: IGameLogicProviderProps) => {
  // Contexts
  const { blockNumber } = useContext(BitcoinContext);
  const { setStep } = useContext(StepsContext);
  const { getWinners } = useContext(PlayersContext);

  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const startGame = () => {
    setGameStarted(true);
    setStep(1);
    getWinners();
  };

  useEffect(() => {
    if (!gameStarted && blockNumber >= BLOCK_HIT) {
      startGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  return (
    <GameLogicContext.Provider value={{}}>{children}</GameLogicContext.Provider>
  );
};
