import { useEffect, useState } from "react";
import BlockSimulator from "../../BlockSimulator/BlockSimulator";
import WaitingBlock from "../../WaitingBlock";

const Pending = () => {
  return (
    <>
      <WaitingBlock />
      <BlockSimulator />
    </>
  );
};

export default Pending;
