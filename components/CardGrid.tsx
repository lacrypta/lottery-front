import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { PlayersContext } from "../contexts/Players";
import { Animated } from "react-animated-css";
import Card from "./Card";
import { ConfigContext } from "../contexts/Config";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 1em;
`;

interface ICardGridProps {
  winners: string[];
  onlyWinners: boolean;
}

const CardGrid = ({ winners = [], onlyWinners = false }: ICardGridProps) => {
  const { staggeringDelay } = useContext(ConfigContext);
  const { players, total } = useContext(PlayersContext);

  const [] = useState<boolean>(false);

  const cards = players?.map((player, k) => {
    const isWinner = winners.includes(player);
    return (
      <Animated
        key={k}
        animationIn='zoomInRight'
        animationOut='zoomOut'
        animationInDuration={1300}
        animationInDelay={k * (staggeringDelay || 60)}
        isVisible={isWinner ? true : !onlyWinners}
      >
        <Card id={player} die={!isWinner && onlyWinners} winner={isWinner} />
      </Animated>
    );
  });
  // for (let id = 1; id < total + 1; id++) {
  //   const isWinner = winners.includes(id);
  //   cards.push(
  //     <Animated
  //       key={id}
  //       animationIn='zoomInRight'
  //       animationOut='zoomOut'
  //       animationInDuration={1300}
  //       animationInDelay={id * (staggeringDelay || 60)}
  //       isVisible={isWinner ? true : !onlyWinners}
  //     >
  //       <Card id={id} die={!isWinner && onlyWinners} winner={isWinner} />
  //     </Animated>
  //   );
  // }

  return <Container>{cards}</Container>;
};

export default CardGrid;
