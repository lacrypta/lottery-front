import type { NextPage } from "next";
import Head from "next/head";
import BitcoinBlock from "../components/BitcoinBlock";
import CardGrid from "../components/CardGrid";
import GlobalContainer from "../components/common/GlobalContainer";
import MainBlock from "../components/common/MainBlock";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

const Home: NextPage = () => {
  return (
    <GlobalContainer>
      <Head>
        <title>La Crypta Loteria</title>
        <meta name='description' content='Lotería de Entradas para LaBitconf' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MainBlock>
        <Logo />

        <BitcoinBlock />

        <CardGrid />
      </MainBlock>

      <Footer />
    </GlobalContainer>
  );
};

export default Home;
