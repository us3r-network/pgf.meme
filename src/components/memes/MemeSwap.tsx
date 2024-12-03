import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { MemeData } from "@/services/meme/types";
import { Address } from "viem";
import { Card, CardContent } from "@/components/ui/card";
import MemeSwapWithJupiter from "./MemeSwapWithJupiter";
import { base } from "viem/chains";
import { cn } from "@/lib/utils";
import MemeSwapWithMatcha from "./MemeSwapWithMatcha";

export default function MemeSwap({
  meme,
  isSol,
}: {
  meme: MemeData;
  isSol?: boolean;
}) {
  // const token = {
  //   contractAddress: meme.address as Address,
  //   chainId: PGF_CONTRACT_CHAIN_ID,
  //   logoURI: meme.image,
  // };
  const token = {
    contractAddress: "0x0Db510e79909666d6dEc7f5e49370838c16D950f" as Address,
    chainId: base.id,
  };

  return (
    <Card className={cn("w-full min-h-[400px] border-secondary")}>
      <CardContent className="w-full h-full p-0">
        {isSol ? (
          <MemeSwapWithJupiter
            token={{ address: "A53BzB7297SXdF6mguQQ8kzqjVYt8pUeHW5m1i8pD6hf" }}
          />
        ) : (
          <MemeSwapWithMatcha token={token} />
        )}
      </CardContent>
    </Card>
  );
}
