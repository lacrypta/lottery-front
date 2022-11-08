import { useContext } from "react";
import styled from "styled-components";
import { BitcoinContext } from "../contexts/Bitcoin";
import { ConfigContext } from "../contexts/Config";

const Container = styled.div`
  margin-top: 1em;
  font-size: 5vh;
`;

const WaitingBlock = () => {
  const { blockNumber } = useContext(BitcoinContext);
  const { blockTarget } = useContext(ConfigContext);
  return (
    <Container>
      {blockNumber === 0 ? (
        "Cargando Bloques de Bitcoin..."
      ) : (
        <div>Bloque actual: {blockNumber}</div>
      )}

      <p>Esperando bloque de Bitcoin #{blockTarget}...</p>
    </Container>
  );
};

export default WaitingBlock;
