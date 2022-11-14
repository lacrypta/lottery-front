import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BitcoinContext } from "../../../contexts/Bitcoin";
import { getBlockCount } from "../../../lib/getblock";
import { ajaxCall } from "../../../lib/request";

const Container = styled.div`
  border: 1px solid #ddd;
  padding: 3em;
  margin-top: 3em;
  font-size: 4vh;
`;

const DivLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2vh;
  width: 25vw;
`;

const Button = styled.button`
  border: 1px solid #ddd;
  width: 100%;
  height: 9vh;
  font-size: 5vh;

  cursor: pointer;
  :hover {
    background: black;
    color: white;
  }

  :active {
    background: white;
    color: black;
  }
`;

const Setup = () => {
  const { getCurrentBlock } = useContext(BitcoinContext);

  const [password, setPassword] = useState<string>("");
  const [blockNumber, setBlockNumber] = useState<number>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    ajaxCall("setblock", {
      password,
      blockNumber,
    });
  };

  useEffect(() => {
    if (!getCurrentBlock) {
      return;
    }
    getCurrentBlock().then((currentBlock) => {
      setBlockNumber(currentBlock);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <DivLine>
          Block Target:{" "}
          <input
            type='text'
            name='blockTarget'
            id='blockTarget'
            value={blockNumber || ""}
            autoComplete='off'
            onChange={(e) => setBlockNumber(parseInt(e.target.value))}
          />
        </DivLine>
        <DivLine>
          Password:{" "}
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            autoComplete='off'
            onChange={(e) => setPassword(e.target.value)}
          />
        </DivLine>

        <DivLine>
          <Button type='submit'>GOOOO</Button>
        </DivLine>
      </form>
    </Container>
  );
};

export default Setup;
