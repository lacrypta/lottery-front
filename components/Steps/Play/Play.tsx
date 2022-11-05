import WaitingBlock from "../../WaitingBlock";
import CardGrid from "../../CardGrid";
import Logo from "../../Logo";
import { useContext } from "react";
import { BitcoinContext } from "../../../contexts/Bitcoin";

const Play = () => {
  const { blockHash } = useContext(BitcoinContext);
  return (
    <>
      <Logo />
      <h1>Playing...</h1>
      <h1>Block hash: {blockHash}...</h1>

      <CardGrid />
    </>
  );
};

export default Play;
