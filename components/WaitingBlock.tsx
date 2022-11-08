import { useContext } from "react";
import styled from "styled-components";
import { BitcoinContext } from "../contexts/Bitcoin";
import { ConfigContext } from "../contexts/Config";

const Container = styled.div`
  margin-top: 1em;
  font-size: 5vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlockNumber = styled.div`
  margin-bottom: 1em;
`;

const BlockTargetDiv = styled.div``;

const WaitingBlock = () => {
  const { blockNumber } = useContext(BitcoinContext);
  const { blockTarget } = useContext(ConfigContext);
  return (
    <Container>
      {blockNumber === 0 ? (
        "Cargando Bloques de Bitcoin..."
      ) : (
        <BlockNumber>Bloque actual: {blockNumber}</BlockNumber>
      )}

      <BlockTargetDiv>
        Esperando bloque de Bitcoin #{blockTarget}...
      </BlockTargetDiv>
    </Container>
  );
};

export default WaitingBlock;
