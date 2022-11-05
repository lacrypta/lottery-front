import WaitingBlock from "../../WaitingBlock";
import CardGrid from "../../CardGrid";
import Logo from "../../Logo";
import { useContext } from "react";
import { PlayersContext } from "../../../contexts/Players";

const Finished = () => {
  const { winners } = useContext(PlayersContext);
  return (
    <>
      <Logo />
      <h1>Finished!</h1>
      <WaitingBlock />

      <CardGrid onlyWinners={true} winners={winners || []} />
    </>
  );
};

export default Finished;
