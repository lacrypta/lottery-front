import styled from "styled-components";
import Block from "./Block";

const Container = styled.div`
  margin-top: 1em;
  font-size: 3vh;

  & h1 {
    font-size: 4vh;
  }
`;

const BlockSimulator = () => {
  return (
    <Container>
      <h1>Simulador de Bloques</h1>
      <div>
        <Block play={true} zeros={2} seed='23432423' speed={1} />
      </div>
    </Container>
  );
};

export default BlockSimulator;
