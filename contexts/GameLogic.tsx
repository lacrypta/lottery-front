import { createContext, useContext, useEffect, useState } from "react";
import { BitcoinContext } from "./Bitcoin";
import { ConfigContext } from "./Config";
import { PlayersContext } from "./Players";
import { StepsContext } from "./Steps";

interface IGameLogicContext {}

export const GameLogicContext = createContext<IGameLogicContext>({});

interface IGameLogicProviderProps {
  children: any;
}

export const GameLogicProvider = ({ children }: IGameLogicProviderProps) => {
  // Contexts
  const { blockNumber } = useContext(BitcoinContext);
  const { setStep } = useContext(StepsContext);
  const { getWinners } = useContext(PlayersContext);
  const { loaded, blockTarget } = useContext(ConfigContext);

  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const startGame = () => {
    setGameStarted(true);
    setStep(1);
    getWinners();
  };

  useEffect(() => {
    if (loaded && !gameStarted && blockTarget && blockNumber >= blockTarget) {
      startGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, gameStarted, blockNumber, blockTarget]);

  return (
    <GameLogicContext.Provider value={{}}>{children}</GameLogicContext.Provider>
  );
};
