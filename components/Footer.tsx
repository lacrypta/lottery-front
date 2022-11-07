import Image from "next/image";
import styled from "styled-components";

const Container = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;

  & a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`;

const Footer = () => {
  return (
    <Container>
      <a
        href='https://lacrypta.com.ar'
        target='_blank'
        rel='noopener noreferrer'
      >
        Made with ❤️ by La Crypta
      </a>
    </Container>
  );
};

export default Footer;
