import { useEffect, useState } from "react";
import { useNomad } from "../hooks/useNomad";

type ILotteryABI = {
  halve: (
    seed: string,
    weightedPlayers: { [player: string]: number }
  ) => { [player: string]: number };
  lottery: (seed: string, winners: number, players: string[]) => string[];
};

export const NomadTest = () => {
  const [winners, setWinners] = useState<string[]>([]);
  // const { lottery } = useNomad<ILotteryABI>(
  //   "1054c92c697c85e1947119fea1445668aa1a7ea9f13dd87c36613b694b52d8e9"
  // );

  const { lottery, halve, status, isLoading, eventEmitter, error } =
    useNomad<ILotteryABI>("timba@hodl.ar/lottery@latest");

  useEffect(() => {
    if (!lottery) {
      return;
    }

    const seed = "some seed";
    const winnersCount = 5;
    const players = [
      "Alice",
      "Bob",
      "Charlie",
      "Dave",
      "Eve",
      "Frank",
      "Grace",
      "Heidi",
      "Ivan",
      "Judy",
      "Mallory",
      "Nina",
      "Oscar",
      "Peggy",
      "Rupert",
      "Sybil",
      "Ted",
      "Victor",
      "Walter",
    ];

    const _winners = lottery(seed, winnersCount, players);
    setWinners(_winners);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lottery]);

  useEffect(() => {
    if (!halve) {
      return;
    }

    const participants = {
      Alice: 10000,
      Bob: 20000,
      Charlie: 30000,
      Dave: 40000,
      Eve: 50000,
      Frank: 60000,
      Grace: 70000,
      Heidi: 80000,
      Ivan: 90000,
      Judy: 100000,
      Mallory: 110000,
      Nina: 120000,
      Oscar: 130000,
      Peggy: 140000,
      Rupert: 150000,
      Sybil: 160000,
      Ted: 170000,
      Victor: 180000,
      Walter: 190000,
      Chuchen: 190000,
      Cocuhle: 250000,
      Yuyu: 260000,
      Yuy4: 260000,
      Queue: 300000,
    };

    const result = halve("some seed2", participants);

    console.info("result:");
    console.dir(result);
  }, [halve]);

  return (
    <div>
      <div>Status: {status}</div>
      <div>
        {isLoading ? (
          <div>Cargando Nomad...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div>Winners: {JSON.stringify(winners)}</div>
        )}
      </div>
    </div>
  );
};
