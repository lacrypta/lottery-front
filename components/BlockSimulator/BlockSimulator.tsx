import { useEffect, useState } from "react";
import styled from "styled-components";
import Block from "./Block";

const Container = styled.div`
  margin-top: 1em;
  font-size: 3vh;

  & h1 {
    font-size: 4vh;
  }
`;

interface IBlock {
  seed: string;
  speed: number;
  zeros: number;
}

const BlockSimulator = () => {
  let mounted = false;

  const [blocks, setBlocks] = useState<IBlock[]>([]);
  const nextBlock = (seed: string) => {
    console.info("Next block");
    const newBlock = {
      seed,
      speed: 300,
      zeros: 1,
    };
    setBlocks((blocks) => [...blocks, newBlock]);
  };

  useEffect(() => {
    if (mounted) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mounted = true;
    nextBlock("SEEEDyss");
  }, []);

  return (
    <Container>
      <h1>Simulador de Bloques</h1>
      <div>
        {blocks.map((block, k) => (
          <Block
            key={k}
            zeros={k + 1}
            onReady={nextBlock}
            seed={block.seed}
            speed={k + 1}
          />
        ))}
      </div>
    </Container>
  );
};

export default BlockSimulator;
