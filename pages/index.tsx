import type { NextPage } from "next";
import Head from "next/head";
import { useContext } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Pending from "../components/Steps/Pending/Pending";
import Play from "../components/Steps/Play/Play";
import Setup from "../components/Steps/Setup/Setup";
import Ticket from "../components/Ticket";
import { ConfigContext } from "../contexts/Config";
import { StepsContext } from "../contexts/Steps";
import { NomadTest } from "../components/NomadTest";

const GlobalContainer = styled.div`
  padding: 0 2rem;
`;

const MainBlock = styled.main`
  min-height: 100vh;
  padding: 1.5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home: NextPage = () => {
  const { step } = useContext(StepsContext);
  const { blockTarget, loaded } = useContext(ConfigContext);
  return (
    <GlobalContainer>
      <Head>
        <title>La Crypta Loteria</title>
        <meta name='description' content='Lotería de Entradas para LaBitconf' />
        <link rel='icon' href='/favicon.ico' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css'
        ></link>
      </Head>
      {/* <MainBlock>
        <Ticket />
        {!blockTarget ? (
          loaded ? (
            <Setup />
          ) : (
            "Cargando configuración..."
          )
        ) : (
          <>
            {step === 0 ? <Pending /> : ""}
            {step === 1 ? <Play key='play' /> : ""}
          </>
        )}
      </MainBlock> */}

      <NomadTest />

      <Footer />
    </GlobalContainer>
  );
};

export default Home;
