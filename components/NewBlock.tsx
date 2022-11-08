import React, { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import styled, { keyframes } from "styled-components";

const flash = keyframes`
0%,
50%,
100% {
  opacity: 1;
  background: white;
}
25%,
75% {
  opacity: 0;
  background: black;
}
`;

const NewBlockDiv = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30vh;
  z-index: 99999;
  text-shadow: -3px 3px 0 #000, 3px 3px 0 #000, 3px -3px 0 #000,
    -3px -3px 0 #000;
  color: white;
  animation: ${flash} 1s ease infinite;
`;

const NewBlock = ({ delay }: { delay: number }) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NewBlockDiv>
      <Animated
        animationIn='bounceIn'
        animationOut='fadeOut'
        animationInDuration={500}
        animationOutDuration={300}
        isVisible={isVisible}
      >
        <div>
          <div>NUEVO</div>
          <div>BLOQUE!</div>
        </div>
      </Animated>
    </NewBlockDiv>
  );
};

export default NewBlock;
