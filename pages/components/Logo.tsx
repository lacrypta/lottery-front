import Image from "next/image";
import styled from "styled-components";
import logoImage from "../../public/logo.png";

const Container = styled.div`
  max-width: 800px;
`;

const Logo = () => {
  return (
    <Container>
      <Image src={logoImage} alt='La Crypta Logo' />
    </Container>
  );
};

export default Logo;
