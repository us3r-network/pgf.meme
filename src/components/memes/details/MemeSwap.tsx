import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { MemeData } from "@/services/meme/types";
import { Address } from "viem";
import MemeSwapWithEvm from "../MemeSwapWithUniswap";
import { Card, CardContent } from "@/components/ui/card";
import MemeSwapWithSol from "../MemeSwapWithJupiter";

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
          <MemeSwapWithSol
            token={{ address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" }}
          />
        ) : (
          <MemeSwapWithEvm token={token} />
        )}
      </CardContent>
    </Card>
  );
}
