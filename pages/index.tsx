import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Finished from "../components/Steps/Finished/Finished";
import Pending from "../components/Steps/Pending/Pending";
import Play from "../components/Steps/Play/Play";
import { StepsContext } from "../contexts/Steps";

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
  const { step } = useContext(StepsContext);
  return (
    <GlobalContainer>
      <Head>
        <title>La Crypta Loteria</title>
        <meta name='description' content='Lotería de Entradas para LaBitconf' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <MainBlock>
        {step === 0 ? <Pending /> : ""}
        {step === 1 ? <Play key='play' /> : ""}
        {step === 2 ? <Finished /> : ""}
      </MainBlock>

      <Footer />
    </GlobalContainer>
  );
};

export default Home;
