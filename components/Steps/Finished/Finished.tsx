import WaitingBlock from "../../WaitingBlock";
import CardGrid from "../../CardGrid";
import Logo from "../../Logo";

const Finished = () => {
  return (
    <>
      <Logo />
      <h1>Finished!</h1>
      <WaitingBlock />

      <CardGrid />
    </>
  );
};

export default Finished;
