import { useState } from "react";
import styled from "styled-components";
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
  const [password, setPassword] = useState<string>("");
  const [blockNumber, setBlockNumber] = useState<number>();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    ajaxCall("setblock", {
      password,
      blockNumber,
    });
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <DivLine>
          Block Target:{" "}
          <input
            type='text'
            value={blockNumber || ""}
            onChange={(e) => setBlockNumber(parseInt(e.target.value))}
          />
        </DivLine>
        <DivLine>
          Password:{" "}
          <input
            type='password'
            value={password}
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
