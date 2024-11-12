"use client";

import { WALLET_CONNECT_PROJECT_ID } from "@/constants";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  sepolia,
} from "viem/chains";
import { http } from "wagmi";

export const config = getDefaultConfig({
  appName: "pgf.meme",
  projectId: WALLET_CONNECT_PROJECT_ID,
  chains: [
    arbitrum,
    arbitrumSepolia,
    base,
    baseSepolia,
    mainnet,
    optimism,
    optimismSepolia,
    sepolia,
  ],
  transports: {
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
  },
  // ssr: true, // If your dApp uses server side rendering (SSR)
});
