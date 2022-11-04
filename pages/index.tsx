import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import Footer from "../components/Footer";
import Pending from "../components/Steps/Pending/Pending";

const GlobalContainer = styled.div`
  padding: 0 2rem;
`;

const MainBlock = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Home: NextPage = () => {
  return (
    <GlobalContainer>
      <Head>
        <title>La Crypta Loteria</title>
        <meta name='description' content='Lotería de Entradas para LaBitconf' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MainBlock>
        <Pending />
      </MainBlock>

      <Footer />
    </GlobalContainer>
  );
};

export default Home;
