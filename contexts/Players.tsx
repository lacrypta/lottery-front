import { createContext, useContext, useEffect, useState } from "react";
import { useContract, useProvider } from "wagmi";
import { ConfigContext } from "./Config";

import deployedLottery from "@lacrypta/lottery/deployments/matic/Lottery.json";
import { Lottery, ILottery } from "@lacrypta/lottery/typechain-types";
import { BigNumber } from "ethers";
import { BitcoinContext } from "./Bitcoin";

const { abi: lotteryAbi, address: contractAddress } = deployedLottery;

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

function generateArray(total: number) {
  const res = [];
  for (let i = 1; i <= total; i++) {
    res.push(String(i));
  }
  return res;
}

export const PlayersProvider = ({ children }: IPlayersProviderProps) => {
  const { totalPlayers, totalWinners } = useContext(ConfigContext);
  const [winners, setWinners] = useState<number[]>([]);
  const { blockHash } = useContext(BitcoinContext);

  const provider = useProvider();

  const contract: Lottery = useContract({
    address: contractAddress,
    abi: lotteryAbi,
    signerOrProvider: provider,
  }) as Lottery;

  const getWinners = async () => {
    const callData: ILottery.ConfigStruct = {
      seed: "0x" + blockHash,
      numberOfWinners: totalWinners as number,
      players: generateArray(totalPlayers as number),
    };

    const _winners = await contract["simulate((bytes32,uint256,string[]))"](
      callData
    );

    console.info("Winners:");
    console.dir(_winners);

    setWinners(_winners.map((n: string) => parseInt(n)));
  };

  return (
    <PlayersContext.Provider
      value={{ total: totalPlayers || 1, winners, getWinners }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
