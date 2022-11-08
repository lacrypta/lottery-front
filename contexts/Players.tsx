import { createContext, useContext, useEffect, useState } from "react";
import { useContract, useProvider } from "wagmi";
import { ConfigContext } from "./Config";

import deployedLottery from "@lacrypta/lottery/deployments/matic/Lottery.json";
import { Lottery, ILottery } from "@lacrypta/lottery/typechain-types";
import { BitcoinContext } from "./Bitcoin";
import { ajaxCall } from "../lib/request";
import { CreateLotteryRequest } from "../types/request";

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
  const { totalPlayers, totalWinners, lotteryName, txHash } =
    useContext(ConfigContext);
  const [winners, setWinners] = useState<number[]>([]);
  const { blockHash } = useContext(BitcoinContext);

  const provider = useProvider();

  const contract: Lottery = useContract({
    address: contractAddress,
    abi: lotteryAbi,
    signerOrProvider: provider,
  }) as Lottery;

  const getWinners = async () => {
    const lotteryConfig: ILottery.ConfigStruct = {
      seed: "0x" + blockHash,
      numberOfWinners: totalWinners as number,
      players: generateArray(totalPlayers as number),
    };

    const _winners = await contract["simulate((bytes32,uint256,string[]))"](
      lotteryConfig
    );

    const requestData: CreateLotteryRequest = {
      name: lotteryName as string,
      config: lotteryConfig,
    };

    if (!txHash) {
      await ajaxCall("publish", requestData);
    }

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
