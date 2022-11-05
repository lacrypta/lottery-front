import { useContext, useEffect } from "react";
import styled from "styled-components";
import { PlayersContext } from "../contexts/Players";
import Card from "./Card";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const CardGrid = () => {
  const { total } = useContext(PlayersContext);
  const cards = [];

  for (let id = 1; id < total + 1; id++) {
    cards.push(<Card key={id} id={id} winner={false} />);
  }

  return <Container>{cards}</Container>;
};

export default CardGrid;
