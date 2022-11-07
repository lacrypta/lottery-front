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
  winners: number[];
  onlyWinners: boolean;
}

const CardGrid = ({ winners = [], onlyWinners = false }: ICardGridProps) => {
  const { staggeringDelay } = useContext(ConfigContext);
  const { total } = useContext(PlayersContext);
  const cards = [];

  for (let id = 1; id < total + 1; id++) {
    const isWinner = winners.includes(id);
    cards.push(
      <Animated
        key={id}
        animationIn='zoomInRight'
        animationOut='zoomOut'
        animationInDuration={1300}
        animationInDelay={id * (staggeringDelay || 60)}
        isVisible={isWinner ? true : !onlyWinners}
      >
        <Card id={id} die={!isWinner && onlyWinners} winner={isWinner} />
      </Animated>
    );
  }

  return <Container>{cards}</Container>;
};

export default CardGrid;
