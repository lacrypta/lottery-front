import CardGrid from "../../CardGrid";
import Logo from "../../Logo";
import React, { useContext, useEffect, useState } from "react";
import { BitcoinContext } from "../../../contexts/Bitcoin";
import { PlayersContext } from "../../../contexts/Players";
import { ConfigContext } from "../../../contexts/Config";

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const Play = () => {
  const { blockHash } = useContext(BitcoinContext);
  const { total, winners } = useContext(PlayersContext);
  const { lotteryDelay, staggeringDelay } = useContext(ConfigContext);

  const [started, setStarted] = useState(false);

  const [winnersShown, setWinnersShown] = useState<number[]>([]);
  const [showWinnerInterval, setShowWinnerInterval] = useState<NodeJS.Timer>();
  const [winnerIndex, setWinnerIndex] = useState<number>(0);

  let mounted = false;

  async function startLottery() {
    setShowWinnerInterval(
      setInterval(() => {
        setWinnerIndex((i) => ++i);
      }, lotteryDelay)
    );
  }

  async function onFinishedLottery() {
    console.info("Finished lottery");
  }

  async function startProcess() {
    if (!winners || !staggeringDelay || !lotteryDelay) {
      return;
    }

    setTimeout(() => {
      startLottery();
    }, staggeringDelay * total + lotteryDelay);
  }

  // New Winner interval
  useEffect(() => {
    if (!showWinnerInterval || !winners) {
      return;
    }
    if (winnerIndex >= winners.length) {
      clearInterval(showWinnerInterval);
      onFinishedLottery();
      return;
    }
    setWinnersShown((old) => [...old, winners[winnerIndex]]);
  }, [showWinnerInterval, winners, winnerIndex]);

  // Start process when ready
  useEffect(() => {
    if (mounted || started || !winners) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mounted = true; // Prevent multiple runs
    setStarted(true);
    startProcess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, winners]);

  return (
    <>
      <Logo />
      <h1>Playing...</h1>
      <h1>Block hash: {blockHash}</h1>

      <CardGrid winners={winnersShown} />
    </>
  );
};

export default React.memo(Play);
