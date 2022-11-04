import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { PlayersProvider } from "../contexts/Players";
import { StepsProvider } from "../contexts/Steps";
import { BitcoinProvider } from "../contexts/Bitcoin";
import { GameLogicProvider } from "../contexts/GameLogic";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten]
      : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Lottery",
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
        <StepsProvider>
          <BitcoinProvider>
            <PlayersProvider>
              <GameLogicProvider>
                <Component {...pageProps} />
              </GameLogicProvider>
            </PlayersProvider>
          </BitcoinProvider>
        </StepsProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
