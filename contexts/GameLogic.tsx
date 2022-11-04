import { createContext, useEffect, useState } from "react";

interface IGameLogicContext {}

export const GameLogicContext = createContext<IGameLogicContext>({});

interface IGameLogicProviderProps {
  children: any;
}

export const GameLogicProvider = ({ children }: IGameLogicProviderProps) => {
  return (
    <GameLogicContext.Provider value={{}}>{children}</GameLogicContext.Provider>
  );
};
