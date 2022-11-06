import React, { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import styled from "styled-components";

const CounterDiv = styled.div`
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

interface ICounterProps {
  value: number;
  delay: number;
}

const Counter = ({ value, delay }: ICounterProps) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 800 + delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CounterDiv>
      <Animated
        animationIn='bounceIn'
        animationOut='fadeOut'
        animationInDelay={delay}
        animationInDuration={300}
        animationOutDuration={300}
        isVisible={isVisible}
      >
        <div>{value}</div>
      </Animated>
    </CounterDiv>
  );
};

export default React.memo(Counter);
