/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import logoImage from "../public/logo.png";

const Container = styled.div`
  max-width: 800px;
`;

const Logo = () => {
  return (
    <Container>
      <img width='100%' src={logoImage.src} alt='La Crypta Logo' />
    </Container>
  );
};

export default Logo;
