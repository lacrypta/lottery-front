import { useEffect } from "react";
import { useNomad } from "../hooks/useNomad";

type ILotteryABI = {
  lottery: (seed: string, winners: number, players: string[]) => string[];
};

export const NomadTest = () => {
  const { lottery } = useNomad<ILotteryABI>(
    "1054c92c697c85e1947119fea1445668aa1a7ea9f13dd87c36613b694b52d8e9"
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

    const winners = lottery(seed, winnersCount, players);

    console.info("winners:");
    console.dir(winners);
  }, [lottery]);

  return <div>hola</div>;
};
