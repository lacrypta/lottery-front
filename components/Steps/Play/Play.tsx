import WaitingBlock from "../../WaitingBlock";
import CardGrid from "../../CardGrid";
import Logo from "../../Logo";

const Play = () => {
  return (
    <>
      <Logo />
      <h1>Playing...</h1>
      <WaitingBlock />

      <CardGrid />
    </>
  );
};

export default Play;
