"use client";

import { config } from "@/constants/wagmiConfig";
import { store } from "@/store/store";
import { lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Provider } from "react-redux";
import { WagmiProvider } from "wagmi";
import AsyncData from "./AsyncData";
import { merge } from "lodash";
import { PGF_CONTRACT_CHAIN } from "@/constants/pgf";

dayjs.extend(relativeTime);

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            initialChain={PGF_CONTRACT_CHAIN}
            locale="en"
            theme={merge(lightTheme(), {
              colors: {
                accentColor: "#ffffff",
                accentColorForeground: "#FF1393",
              },
              fonts: {
                body: "unset",
              },
              radii: {
                connectButton: "9999px",
              },
            })}
          >
            <Provider store={store}>
              {children}
              <AsyncData />
            </Provider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
