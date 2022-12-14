import styled, { keyframes } from "styled-components";

interface ICardProps {
  id: string;
  die: boolean;
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
  margin: 0.4em;
  padding: 0.8rem;
  font-size: 2rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: all 0.5s ease;
  text-align: center;

  &.winner {
    background: black;
    color: white;
    animation-name: ${winnerAnimation};
    animation-duration: 0.5s;
    transform: scale(1.1);
  }

  &.die {
    overflow: hidden;
    width: 0px;
    padding: 0px;
    margin: 0px;
    border: 0;
  }
`;

const Card = ({ id, winner, die }: ICardProps) => {
  const classNames = [];
  if (winner) {
    classNames.push("winner");
  }
  if (die) {
    classNames.push("die");
  }
  return <Container className={classNames.join(" ")}>{id}</Container>;
};

export default Card;
