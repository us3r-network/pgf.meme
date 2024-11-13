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
import { Toaster } from "./ui/toaster";

dayjs.extend(relativeTime);

const queryClient = new QueryClient();
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            locale="en"
            theme={lightTheme({
              accentColor: "#ffffff",
              accentColorForeground: "#FF1393",
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
