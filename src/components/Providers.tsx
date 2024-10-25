"use client";

// import { store } from "@/store/store";
// import { Provider } from "react-redux";
// import "@rainbow-me/rainbowkit/styles.css";
import { WALLET_CONNECT_PROJECT_ID } from "@/constants";
import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  arbitrum,
  base,
  baseSepolia,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "viem/chains";
import { WagmiProvider } from "wagmi";
import { Toaster } from "./ui/toaster";

export const config = getDefaultConfig({
  appName: "pgf.meme",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, sepolia, base, baseSepolia],
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
            {children}

            {/* <Provider store={store}>{children}</Provider> */}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
      <Toaster />
    </>
  );
}
