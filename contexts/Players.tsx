import { createContext, useContext, useEffect, useState } from "react";
import { useContract, useProvider } from "wagmi";
import { ConfigContext } from "./Config";

import lotteryAbi from "../abi/ILottery.json";
import { BigNumber } from "ethers";
import { BitcoinContext } from "./Bitcoin";

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
  const { contractAddress } = useContext(ConfigContext);
  const { blockHash } = useContext(BitcoinContext);

  const provider = useProvider();

  const contract = useContract({
    address: contractAddress,
    abi: lotteryAbi,
    signerOrProvider: provider,
  });

  const getWinners = async () => {
    const _winners = await contract?.simulate([
      "0x" + blockHash,
      totalPlayers,
      totalWinners,
    ]);

    setWinners(_winners.map((n: BigNumber) => parseInt(n.toString())));
  };

  return (
    <PlayersContext.Provider
      value={{ total: totalPlayers || 1, winners, getWinners }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
