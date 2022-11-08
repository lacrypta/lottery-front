import styled from "styled-components";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

const Container = styled.div`
  font-size: 12vh;
  margin: 0em;
  padding: 0;
  overflow: hidden;
  max-height: 0vh;
  transition: all 0.5s 0s ease-in-out;

  &.show {
    margin: 0.3em 0 0.1em;
    max-height: 100vh;
  }
`;

interface ICongratulationsProps {
  visible: boolean;
}

const Congratulations = ({ visible }: ICongratulationsProps) => {
  const { width, height } = useWindowSize();
  return (
    <>
      {visible ? <Confetti width={width} height={height} /> : ""}
      <Container className={visible ? "show" : ""}>Ganadores:</Container>
    </>
  );
};
export default Congratulations;
