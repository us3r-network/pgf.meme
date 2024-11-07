"use client";

import { WALLET_CONNECT_PROJECT_ID } from "@/constants";
import {
    getDefaultConfig
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
    arbitrum,
    base,
    baseSepolia,
    mainnet,
    optimism,
    polygon,
    sepolia,
} from "viem/chains";
import { http } from "wagmi";

export const config = getDefaultConfig({
    appName: "pgf.meme",
    projectId: WALLET_CONNECT_PROJECT_ID,
    chains: [mainnet, polygon, optimism, arbitrum, sepolia, base, baseSepolia],
    transports: {
      [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    }
    // ssr: true, // If your dApp uses server side rendering (SSR)
  });