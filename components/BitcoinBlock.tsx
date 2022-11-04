import { useContext } from "react";
import styled from "styled-components";
import { BitcoinContext } from "../contexts/Bitcoin";

const Container = styled.div``;

const BLOCK_HIT = process.env.NEXT_PUBLIC_BLOCK_START;

const BitcoinBlock = () => {
  const { blockNumber } = useContext(BitcoinContext);
  return (
    <Container>
      <div>Bloque actual: {blockNumber}</div>
      <p>Esperando bloque de Bitcoin #{BLOCK_HIT}...</p>
    </Container>
  );
};

export default BitcoinBlock;
