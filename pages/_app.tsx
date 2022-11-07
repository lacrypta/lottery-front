import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { PlayersProvider } from "../contexts/Players";
import { StepsProvider } from "../contexts/Steps";
import { BitcoinProvider } from "../contexts/Bitcoin";
import { GameLogicProvider } from "../contexts/GameLogic";
import { ConfigProvider } from "../contexts/Config";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.polygon],
  [infuraProvider({ apiKey: "12519b77348a4af88497f5c70e98b631" })]
);

const { connectors } = getDefaultWallets({
  appName: "La Crypta - Lottery",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
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
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
