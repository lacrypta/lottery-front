import { useContext } from "react";
import styled from "styled-components";
import { PlayersContext } from "../../contexts/Players";
import Card from "./Card";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const CardGrid = () => {
  const { players } = useContext(PlayersContext);
  return (
    <Container>
      {players.map((player) => (
        <Card key={player.id} id={player.id} winner={player.winner} />
      ))}
    </Container>
  );
};

export default CardGrid;
