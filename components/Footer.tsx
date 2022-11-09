import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const Container = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
  z-index: 99999999999;
  position: relative;

  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  & a {
    padding-left: 5px;
  }
`;

const Footer = () => {
  return (
    <Container>
      <div>
        Made with ❤️ by{" "}
        <Link href={"https://github.com/lacrypta/lottery"}> La Crypta</Link>
      </div>
    </Container>
  );
};

export default Footer;
