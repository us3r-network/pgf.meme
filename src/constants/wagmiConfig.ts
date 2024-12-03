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
    base,
    mainnet,
    optimism,
    arbitrum,
    baseSepolia,
    sepolia,
    optimismSepolia,
    arbitrumSepolia,
  ],
  transports: {
    [base.id]: http("https://base-rpc.publicnode.com"),
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    [baseSepolia.id]: http("https://base-sepolia-rpc.publicnode.com"),
    [arbitrumSepolia.id]: http("https://arbitrum-sepolia-rpc.publicnode.com"),
    [optimismSepolia.id]: http("https://optimism-sepolia-rpc.publicnode.com"),
  },
  // ssr: true, // If your dApp uses server side rendering (SSR)
});
