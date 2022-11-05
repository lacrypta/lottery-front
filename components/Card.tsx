import styled from "styled-components";

interface ICardProps {
  id: number;
  winner: boolean;
}

const Container = styled.div`
  margin: 0.3em;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 350px;

  &.winner {
    background: black;
    color: white;
  }
`;

const Card = ({ id, winner }: ICardProps) => {
  return <Container>#{id}</Container>;
};

export default Card;
