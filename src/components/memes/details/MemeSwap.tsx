import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { MemeData } from "@/services/meme/types";
import { Address } from "viem";
import { Card, CardContent } from "@/components/ui/card";
import MemeSwapWithUniswap from "../MemeSwapWithUniswap";
import MemeSwapWithJupiter from "../MemeSwapWithJupiter";

export default function MemeSwap({
  meme,
  isSol,
}: {
  meme: MemeData;
  isSol?: boolean;
}) {
  const token = {
    contractAddress: meme.address as Address,
    chainId: PGF_CONTRACT_CHAIN_ID,
    logoURI: meme.image,
  };
  return (
    <Card className="w-full h-[400px] border-secondary">
      <CardContent className="w-full h-full p-0">
        {isSol ? (
          <MemeSwapWithJupiter
            token={{ address: meme?.solToken?.tokenAddress }}
          />
        ) : (
          <MemeSwapWithUniswap token={token} />
        )}
      </CardContent>
    </Card>
  );
}
