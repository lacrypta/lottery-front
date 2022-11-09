import { hashMessage, sha256 } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Nonce = styled.div`
  padding-right: 10px;
  border-right: 1px solid black;
`;

const Hash = styled.div`
  padding-left: 10px;
  width: 620px;
`;

interface IBlockProps {
  seed?: string;
  zeros: number;
  speed?: number;
  play: boolean;
}

const DELAY = 800;

const Block = ({ seed = "0", zeros, play, speed = 1 }: IBlockProps) => {
  const [interator, setIterator] = useState<NodeJS.Timer>();
  const [hash, setHash] = useState<string>(
    "0000000000000000000343071c8e42e323e8024fb1dfb30b231ac7a407ffc30d"
  );
  const [nonce, setNonce] = useState<number>(0);

  let mounted = false;

  let _nonce = nonce;
  const runIteration = (setNonce: any) => {
    console.dir(this);
    setNonce(_nonce++);
    console.info("Nonce", _nonce);
    setHash(hashMessage(seed + _nonce));
  };

  useEffect(() => {
    if (mounted) {
      return;
    }
    mounted = true;

    console.dir(this);
    if (play && !interator) {
      console.info("Add iterator");
      setIterator(
        setInterval(
          runIteration.bind(this, setNonce.bind(setNonce)),
          DELAY / speed
        )
      );
    } else if (!play && interator) {
      console.info("Remove iterator");
      setNonce(0);
      clearInterval(interator);
    } else {
      console.info("Nothing");
    }
  }, [play, interator, nonce]);

  return (
    <Container>
      <Nonce>{nonce}</Nonce>
      <Hash>{hash}</Hash>
    </Container>
  );
};

export default Block;
