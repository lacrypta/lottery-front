import { hashMessage } from "ethers/lib/utils";
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

function isHashValid(hash: string, zeroLength: number = 1) {
  return hash.substring(0, zeroLength) === "".padStart(zeroLength, "0");
}
interface IBlockProps {
  seed?: string;
  zeros: number;
  speed?: number;
  onReady?: (_hash: string) => void;
}

const DELAY = 200;

const Block = ({ seed = "0", zeros, speed = 1, onReady }: IBlockProps) => {
  const [iterator, setIterator] = useState<NodeJS.Timer>();
  const [hash, setHash] = useState<string>();
  const [nonce, setNonce] = useState<number>(0);
  const [play, setPlay] = useState<boolean>(true);

  let mounted = false;

  let _nonce = nonce;
  const runIteration = (setNonce: any) => {
    setNonce(_nonce++);
    const _hash = hashMessage(seed + _nonce).substr(2);
    setHash(_hash);
    if (isHashValid(_hash, zeros)) {
      setPlay(false);
      onReady && onReady(_hash);
    }
  };

  useEffect(() => {
    if (mounted) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    mounted = true;
    if (play && !iterator) {
      setIterator(
        setInterval(
          runIteration.bind(this, setNonce.bind(setNonce)),
          DELAY / speed
        )
      );
    } else if (!play && iterator) {
      clearInterval(iterator);
    } else {
    }
  }, [play, iterator, nonce]);

  useEffect(() => {
    return () => {
      console.info("CLEAR INTERVALLL");
      clearInterval(iterator);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Nonce>{nonce}</Nonce>
      <Hash>{hash}</Hash>
    </Container>
  );
};

export default Block;
