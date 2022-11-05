import styled, { keyframes } from "styled-components";

interface ICardProps {
  id: number;
  visible: boolean;
  winner: boolean;
}

const winnerAnimation = keyframes`
    from {
      transform: scale(1);
    }
    to {
        transform: scale(1.1);
    }
`;

const Container = styled.div`
  margin: 0.3em;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.5s ease, border-color 0.15s ease;
  width: 76px;

  &.winner {
    background: black;
    color: white;
    animation-name: ${winnerAnimation};
    animation-duration: 0.5s;
    transform: scale(1.1);
  }
`;

const Card = ({ id, winner }: ICardProps) => {
  return <Container className={winner ? "winner" : ""}>#{id}</Container>;
};

export default Card;
