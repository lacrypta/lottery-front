import "../styles/globals.css";
import type { AppProps } from "next/app";
import { PlayersProvider } from "../contexts/Players";
import { StepsProvider } from "../contexts/Steps";
import { BitcoinProvider } from "../contexts/Bitcoin";
import { GameLogicProvider } from "../contexts/GameLogic";
import { ConfigProvider } from "../contexts/Config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <StepsProvider>
        <BitcoinProvider>
          <PlayersProvider>
            <GameLogicProvider>
              <Component {...pageProps} />
            </GameLogicProvider>
          </PlayersProvider>
        </BitcoinProvider>
      </StepsProvider>
    </ConfigProvider>
  );
}

export default MyApp;
