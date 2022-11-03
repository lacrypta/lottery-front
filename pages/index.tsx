import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Card from "./components/Card";
import CardGrid from "./components/CardGrid";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>La Crypta Loteria</title>
        <meta name='description' content='Lotería de Entradas para LaBitconf' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Lotería justa baby</h1>

        <p className={styles.description}>
          Esperando bloque de Bitcoin #43.432...
        </p>

        <CardGrid />
      </main>

      <footer className={styles.footer}>
        <a
          href='https://lacrypta.com.ar'
          target='_blank'
          rel='noopener noreferrer'
        >
          Made with ❤️ by La Crypta 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
