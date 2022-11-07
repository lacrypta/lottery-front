import { useContext } from "react";
import styled from "styled-components";
import { BitcoinContext } from "../contexts/Bitcoin";
import { ConfigContext } from "../contexts/Config";

const Container = styled.div`
  margin-top: 1em;
  font-size: 5vh;
`;

const WaitingBlock = () => {
  const { blockTarget } = useContext(ConfigContext);
  const { blockNumber } = useContext(BitcoinContext);
  return (
    <Container>
      <div>Bloque actual: {blockNumber}</div>
      <p>Esperando bloque de Bitcoin #{blockTarget}...</p>
    </Container>
  );
};

export default WaitingBlock;
