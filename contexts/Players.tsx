import { createContext, useContext, useEffect, useState } from "react";
import { ConfigContext } from "./Config";

import { BitcoinContext } from "./Bitcoin";
import { CreateLotteryRequest } from "../types/request";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useNomad } from "../hooks/useNomad";

type ILotteryABI = {
  halve: (
    seed: string,
    weightedPlayers: { [player: string]: number }
  ) => { [player: string]: number };
  lottery: (seed: string, winners: number, players: string[]) => string[];
};

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

  const { lottery, isLoaded } = useNomad<ILotteryABI>("timba@hodl.ar/lottery");

  const getWinners = async () => {
    if (!lottery) {
      alert("Lottery nomad not ready yet");
      return;
    }

    const lotteryConfig = {
      seed: blockHash!,
      numberOfWinners: totalWinners!,
      players,
    };

    const _winners = await lottery(
      lotteryConfig.seed,
      lotteryConfig.numberOfWinners,
      lotteryConfig.players
    );

    console.info("Winners:");
    console.dir(_winners);

    const requestData: CreateLotteryRequest = {
      name: lotteryName as string,
      config: lotteryConfig,
    };

    if (!txHash) {
      // ajaxCall("publish", requestData);
    }

    setWinners(_winners);
  };

  useEffect(() => {
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
      {!isLoaded ? <div>Loading Lottery Nomad...</div> : children}
    </PlayersContext.Provider>
  );
};
