import styled from "styled-components";

const Container = styled.div`
  font-size: 15vh;
  margin: 0em;
  padding: 0;
  overflow: hidden;
  max-height: 0vh;
  transition: all 0.5s 0s ease-in-out;

  &.show {
    margin: 0.5em;
    max-height: 100vh;
  }
`;

interface ICongratulationsProps {
  visible: boolean;
}

const Congratulations = ({ visible }: ICongratulationsProps) => {
  return <Container className={visible ? "show" : ""}>Ganadores:</Container>;
};
export default Congratulations;
