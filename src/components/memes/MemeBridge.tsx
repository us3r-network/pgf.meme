"use client";

import { MemeData } from "@/services/meme/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import WormholeConnect, {
  WormholeConnectConfig,
  nttRoutes,
} from "@wormhole-foundation/wormhole-connect";
import { SOLANA_ENDPOINT } from "@/constants/solana";

const isTestNet = process.env.NEXT_PUBLIC_TESTNET === "true";
export default function MemeBridge({
  meme,
  fromSol,
}: {
  meme: MemeData;
  fromSol?: boolean;
}) {
  const baseToken = meme.baseToken || {
    name: meme.name,
    symbol: meme.symbol,
    tokenAddress: "0x32e55Aaad72f99243AF3d0C26234bcAfE1b892E3",
    nttConnect: {
      manager: "0x4Eac365860007d4aE33076eb191740Ad03F2ff8b",
      transceiver: {
        address: "0x148AfBF98a9DE8CEE3a888C0Fca6A61C5Bdb93e4",
      },
    },
  };
  const solToken = meme.solToken || {
    name: meme.name,
    symbol: meme.symbol,
    tokenAddress: "772N7BvoBjyu84ZuTrWAUiSXujMvcFN9srGAL6DrHZKH",
    nttConnect: {
      manager: "nTtCWLfbe6yFepSauh5hqkbrtUeDq7pMRiBLHhY9Hkc",
      transceiver: {
        address: "8Af44CqbTNeqSeWHpCXZJFFx5zcRRDjJir3F8KbgQXSN",
      },
    },
  };
  const network = isTestNet ? "Testnet" : "Mainnet";
  const chain = isTestNet ? "BaseSepolia" : "Base";
  const wormholeConfig: WormholeConnectConfig = {
    network,
    rpcs: {
      Solana: SOLANA_ENDPOINT,
      // Sepolia: "https://eth-sepolia.api.onfinality.io/public",
      // Base: "wss://base.callstaticrpc.com",
      // BaseSepolia: "wss://base-sepolia-rpc.publicnode.com",
    },
    chains: [chain, "Solana"],
    tokens: ["WSVevm", "WSVsol"],
    ui: {
      title: "",
      defaultInputs: { fromChain: "Solana", toChain: chain },
      showHamburgerMenu: false,
    },
    routes: [
      ...nttRoutes({
        tokens: {
          WSV_NTT: [
            {
              chain: chain,
              manager: baseToken.nttConnect.manager,
              token: baseToken.tokenAddress,
              transceiver: [
                {
                  address: baseToken.nttConnect.transceiver.address,
                  type: "wormhole",
                },
              ],
            },
            {
              chain: "Solana",
              manager: solToken.nttConnect.manager,
              token: solToken.tokenAddress,
              transceiver: [
                {
                  address: solToken.nttConnect.transceiver.address,
                  type: "wormhole",
                },
              ],
            },
          ],
        },
      }),
    ],
    tokensConfig: {
      WSVevm: {
        key: "WSVevm",
        symbol: meme.symbol,
        nativeChain: chain,
        displayName: meme.name,
        tokenId: {
          chain: chain,
          address: baseToken.tokenAddress,
        },
        coinGeckoId: "wormhole",
        icon: meme.image,
        decimals: 18,
      },

      WSVsol: {
        key: "WSVsol",
        symbol: meme.symbol,
        nativeChain: "Solana",
        displayName: meme.name,
        tokenId: {
          chain: "Solana",
          address: solToken.tokenAddress,
        },
        coinGeckoId: "wormhole",
        icon: meme.image,
        decimals: 9,
      },
    },
  };

  return (
    <Card className={cn("w-full min-h-[400px] border-secondary")}>
      <CardContent className="w-full h-full p-0 max-sm:p-0">
        <style>
          {`
          .MuiScopedCssBaseline-root div{
            margin: 0 !important;
          }
        `}
        </style>
        <WormholeConnect
          config={wormholeConfig}
          theme={{
            mode: "light",
            // input: "",
            primary: "#FD1E95",
            secondary: "#03BFFF",
            // text: "#1E1E1E",
            // textSecondary: "#1E1E1E",
            font: "",
          }}
        />
      </CardContent>
    </Card>
  );
}
