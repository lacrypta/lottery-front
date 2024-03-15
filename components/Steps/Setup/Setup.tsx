import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BitcoinContext } from "../../../contexts/Bitcoin";
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
  const { blockNumber } = useContext(BitcoinContext);

  const [password, setPassword] = useState<string>("");
  const [blockTarget, setBlockTarget] = useState<number>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    ajaxCall("setblock", {
      password,
      blockNumber: blockTarget,
    });
  };

  useEffect(() => {
    setBlockTarget(blockNumber);
  }, [blockNumber]);
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
            onChange={(e) => setBlockTarget(parseInt(e.target.value))}
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
