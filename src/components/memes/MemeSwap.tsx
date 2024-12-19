"use client";

import { MemeData } from "@/services/meme/types";
import { Address } from "viem";
import { Card, CardContent } from "@/components/ui/card";
import MemeSwapWithJupiter from "./MemeSwapWithJupiter";
import { cn } from "@/lib/utils";
import MemeSwapWithUniswap from "./MemeSwapWithUniswap";
import { DEFAULT_CHAIN } from "@/constants/chain";

export default function MemeSwap({
  meme,
  isSol,
}: {
  meme: MemeData;
  isSol?: boolean;
}) {
  const baseToken = meme?.baseToken;
  const solToken = meme?.solToken;

  return (
    <Card className={cn("w-full min-h-[400px] border-secondary p-0")}>
      <CardContent className="w-full p-0 max-sm:p-0">
        {baseToken && (
          <div className={cn("w-full h-[560px]", isSol ? "hidden" : "block")}>
            <MemeSwapWithUniswap token={baseToken} />
          </div>
        )}
        {solToken && (
          <div className={cn("w-full h-[400px]", isSol ? "block" : "hidden")}>
            <MemeSwapWithJupiter
              token={{
                address: solToken.tokenAddress as Address,
              }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
