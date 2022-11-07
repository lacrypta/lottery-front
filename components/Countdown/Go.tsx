import React, { useEffect, useState } from "react";
import { Animated } from "react-animated-css";
import styled from "styled-components";

const GoDiv = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 45vh;
  z-index: 99999;
  text-shadow: -3px 3px 0 #000, 3px 3px 0 #000, 3px -3px 0 #000,
    -3px -3px 0 #000;
  color: white;
`;

interface IGoProps {
  delay: number;
}

const Go = ({ delay }: IGoProps) => {
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, 800 + delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GoDiv>
      <Animated
        animationIn='flipInX'
        animationOut='lightSpeedOut'
        animationInDelay={delay}
        animationInDuration={300}
        animationOutDuration={200}
        isVisible={isVisible}
      >
        <div>ARRANCA</div>
      </Animated>
    </GoDiv>
  );
};

export default React.memo(Go);
