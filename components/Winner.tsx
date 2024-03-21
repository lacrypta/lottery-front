import React, { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import styled from "styled-components";

const WinnerDiv = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60vh;
  z-index: 99999;
  text-shadow: -3px 3px 0 #000, 3px 3px 0 #000, 3px -3px 0 #000,
    -3px -3px 0 #000;
  color: white;
`;

interface IWinnerProps {
  value: string;
}

const Winner = ({ value }: IWinnerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WinnerDiv>
      <Animated
        animationIn='tada'
        animationOut='zoomOut'
        // animationInDelay={delay}
        animationInDuration={400}
        animationOutDuration={700}
        isVisible={isVisible}
      >
        <div>{value}</div>
      </Animated>
    </WinnerDiv>
  );
};

export default React.memo(Winner);
