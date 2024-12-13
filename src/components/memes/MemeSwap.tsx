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
    <Card className={cn("w-full min-h-[400px] border-secondary")}>
      <CardContent className="w-full p-0">
        {solToken && (
          <div className={cn("w-full h-[400px]", isSol ? "block" : "hidden")}>
            <MemeSwapWithJupiter
              token={{
                address: solToken.tokenAddress as Address,
              }}
            />
          </div>
        )}

        {baseToken && !isSol && (
          <div className="w-full h-[560px]">
            <MemeSwapWithUniswap token={baseToken} />
          </div>
        )}
        {/* {isSol ? (
          <MemeSwapWithJupiter
            token={{ address: "A53BzB7297SXdF6mguQQ8kzqjVYt8pUeHW5m1i8pD6hf" }}
          />
        ) : (
          <MemeSwapWithUniswap token={token} />
        )} */}
      </CardContent>
    </Card>
  );
}
