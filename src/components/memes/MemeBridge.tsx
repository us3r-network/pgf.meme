"use client";
import { MemeData } from "@/services/meme/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import WormholeConnect, {
  WormholeConnectConfig,
  nttRoutes,
} from "@wormhole-foundation/wormhole-connect";
import { SOLANA_ENDPOINT } from "@/constants/solana";

export default function MemeBridge({
  meme,
  fromSol,
}: {
  meme: MemeData;
  fromSol?: boolean;
}) {
  const defaultInputs = fromSol
    ? { fromChain: "Solana", toChain: "ArbitrumSepolia" }
    : { fromChain: "ArbitrumSepolia", toChain: "Solana" };
  const wormholeConfig: WormholeConnectConfig = {
    network: "Testnet",
    rpcs: {
      Solana: SOLANA_ENDPOINT,
      Ethereum: "https://rpc.ankr.com/eth",
    },
    chains: ["ArbitrumSepolia", "Solana"],
    tokens: ["WSVarbsep", "WSVsol"],
    ui: {
      title: "",
      defaultInputs: defaultInputs as any,
      showHamburgerMenu: false,
    },
    routes: [
      ...nttRoutes({
        tokens: {
          WSV_NTT: [
            {
              chain: "ArbitrumSepolia",
              manager: "0x3F52328B390276eFF9C77940Bc7F81e098De5Ed1",
              token: "0xff1Fa5B426C6155fbc7e22da6700Ad8C95Da01F4",
              transceiver: [
                {
                  address: "0xA12b94F1a82fbd3bD2721659e692A6467b3Fe478",
                  type: "wormhole",
                },
              ],
            },
            {
              chain: "Solana",
              manager: "ntNGLGC45T7X1cMX6ezdPdcZDUwEQL3sb62nhEVhLwa",
              token: "Hyfw9cTZbMaWJqBcWxutVkT8NLuCwixbdGj6zWY7amD2",
              transceiver: [
                {
                  address: "2PeCzGTK2j4cMSb2yZQxLfVBbnsuenf7i3KdSTRfPRZi",
                  type: "wormhole",
                },
              ],
            },
          ],
        },
      }),
    ],
    tokensConfig: {
      WSVarbsep: {
        key: "WSVarbsep",
        symbol: "WSV",
        nativeChain: "ArbitrumSepolia",
        displayName: "WSV",
        tokenId: {
          chain: "ArbitrumSepolia",
          address: "0xff1Fa5B426C6155fbc7e22da6700Ad8C95Da01F4",
        },
        coinGeckoId: "wormhole",
        icon: "https://wormhole.com/token.png",
        decimals: 18,
      },

      WSVsol: {
        key: "WSVsol",
        symbol: "WSV",
        nativeChain: "Solana",
        displayName: "WSV",
        tokenId: {
          chain: "Solana",
          address: "Hyfw9cTZbMaWJqBcWxutVkT8NLuCwixbdGj6zWY7amD2",
        },
        coinGeckoId: "wormhole",
        icon: "https://wormhole.com/token.png",
        decimals: 9,
      },
    },
  };

  return (
    <Card className={cn("w-full min-h-[400px] border-secondary")}>
      <CardContent className="w-full h-full p-0">
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
          }}
        />
      </CardContent>
    </Card>
  );
}
