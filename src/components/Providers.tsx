"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import "@rainbow-me/rainbowkit/styles.css";
import { WALLET_CONNECT_PROJECT_ID } from "@/constants";
import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import {
  arbitrum,
  base,
  baseSepolia,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "viem/chains";
import { http, WagmiProvider } from "wagmi";
import { Toaster } from "./ui/toaster";
import AsyncData from "./AsyncData";

dayjs.extend(relativeTime);

export const config = getDefaultConfig({
  appName: "pgf.meme",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, sepolia, base, baseSepolia],
  transports: {
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
  }
  // ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={lightTheme({
              accentColor: "#16181d",
              accentColorForeground: "#ffffff",
            })}
          >
            <Provider store={store}>
              {children}
              <AsyncData />
            </Provider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
      <Toaster />
    </>
  );
}
