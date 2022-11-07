import CardGrid from "../../CardGrid";
import Logo from "../../Logo";
import React, { useContext, useEffect, useState } from "react";
import { BitcoinContext } from "../../../contexts/Bitcoin";
import { PlayersContext } from "../../../contexts/Players";
import { ConfigContext } from "../../../contexts/Config";
import Countdown from "../../Countdown/Countdown";
import Winner from "../../Winner";
import Congratulations from "../../Congratulations";
import Ticket from "../../Ticket";

const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const COUNTDOWN_NUMBERS = 2;

const Play = () => {
  const { blockHash, blockNumber } = useContext(BitcoinContext);
  const { total, winners } = useContext(PlayersContext);
  const { lotteryDelay, staggeringDelay } = useContext(ConfigContext);

  const [started, setStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [countdownStarted, setCountdownStarted] = useState(false);

  const [winnersShown, setWinnersShown] = useState<number[]>([]);
  const [showWinnerInterval, setShowWinnerInterval] = useState<NodeJS.Timer>();
  const [winnerIndex, setWinnerIndex] = useState<number>(0);

  const [currentWinner, setCurrentWinner] = useState<number>();
  const [congratulationsVisible, setCongratulationsVisible] =
    useState<boolean>(false);

  let mounted = false;

  async function startLottery() {
    setShowWinnerInterval(
      setInterval(() => {
        setWinnerIndex((i) => ++i);
      }, lotteryDelay)
    );
  }

  async function startCountdown() {
    setCountdownStarted(true);
    setTimeout(() => {
      startLottery();
    }, (COUNTDOWN_NUMBERS + 2) * 1000);
  }

  async function onFinishedLottery() {
    console.info("Finished lottery");
    setCongratulationsVisible(true);
    setIsFinished(true);
  }

  async function startProcess() {
    if (!winners || !staggeringDelay || !lotteryDelay) {
      return;
    }

    setTimeout(() => {
      startCountdown();
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
    const winner = winners[winnerIndex];
    if (!winner) {
      return;
    }
    setWinnersShown((old) => [...old, winner]);
    setCurrentWinner(winner);
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
      <Congratulations visible={congratulationsVisible} />
      <h1>
        Bitcoin Block ({blockNumber}): {blockHash}
      </h1>
      <Countdown play={countdownStarted} limit={COUNTDOWN_NUMBERS} />
      <CardGrid onlyWinners={isFinished} winners={winnersShown} />
      {currentWinner ? (
        <Winner key={currentWinner} value={currentWinner} />
      ) : (
        ""
      )}
    </>
  );
};

export default React.memo(Play);
