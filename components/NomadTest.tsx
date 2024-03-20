import { useEffect, useState } from "react";
import { useNomad } from "../hooks/useNomad";

type ILotteryABI = {
  lottery: (seed: string, winners: number, players: string[]) => string[];
};

export const NomadTest = () => {
  const [winners, setWinners] = useState<string[]>([]);
  // const { lottery } = useNomad<ILotteryABI>(
  //   "1054c92c697c85e1947119fea1445668aa1a7ea9f13dd87c36613b694b52d8e9"
  // );

  const { lottery, status, isLoading, error } = useNomad<ILotteryABI>(
    "timba@hodl.ar/lottery"
  );

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
