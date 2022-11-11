import { createContext, useContext, useEffect, useState } from "react";
import { useContract, useProvider } from "wagmi";
import { ConfigContext } from "./Config";

import deployedLottery from "@lacrypta/lottery/deployments/matic/Lottery.json";
import { Lottery, ILottery } from "@lacrypta/lottery/typechain-types";
import { BitcoinContext } from "./Bitcoin";
import { ajaxCall } from "../lib/request";
import { CreateLotteryRequest } from "../types/request";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../lib/firebase";

const { abi: lotteryAbi, address: contractAddress } = deployedLottery;

interface IPlayersContext {
  total: number;
  winners?: string[];
  players?: string[];
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

async function generatePlayers(): Promise<string[]> {
  const playersRef = collection(db, "players");
  const q = query(playersRef);

  const docs = (await getDocs(q)).docs;
  return docs.map((doc) => doc.data().name);
}

export const PlayersProvider = ({ children }: IPlayersProviderProps) => {
  const { totalPlayers, totalWinners, lotteryName, txHash } =
    useContext(ConfigContext);
  const [winners, setWinners] = useState<string[]>([]);
  const { blockHash } = useContext(BitcoinContext);
  const [players, setPlayers] = useState<string[]>([]);

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
      players,
    };

    const _winners = await contract["simulate((bytes32,uint256,string[]))"](
      lotteryConfig
    );

    console.info("Winners:");
    console.dir(_winners);

    const requestData: CreateLotteryRequest = {
      name: lotteryName as string,
      config: lotteryConfig,
    };

    if (!txHash) {
      ajaxCall("publish", requestData);
    }

    setWinners(_winners);
  };

  useEffect(() => {
    // setPlayers(generateArray(totalPlayers as number));
    generatePlayers().then((_players) => {
      setPlayers(_players);
    });
  }, []);

  return (
    <PlayersContext.Provider
      value={{
        total: players.length > 0 ? players.length : totalPlayers || 1,
        winners,
        players,
        getWinners,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};
