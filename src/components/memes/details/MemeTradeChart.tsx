import { MemeData } from "@/services/meme/types";
import { Card, CardContent } from "@/components/ui/card";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { getDexTokenWidgetUrl } from "@/lib/onchain";
import { base } from "viem/chains";

export default function MemeTradeChart({
  meme,
  isSol,
}: {
  meme: MemeData;
  isSol?: boolean;
}) {
  // const dexUrl = isSol
  //   ? getDexTokenWidgetUrl("sol", meme?.solToken.poolAddress)
  //   : getDexTokenWidgetUrl(PGF_CONTRACT_CHAIN_ID, meme?.baseToken.poolAddress);
  const dexUrl = isSol
    ? getDexTokenWidgetUrl(
        "sol",
        "75e1rpyfjrw9tjgnihrw885dycgrkvszsmqbkrm5hhnf"
      )
    : getDexTokenWidgetUrl(
        base.id,
        "0xc4eCaf115CBcE3985748c58dccfC4722fEf8247c"
      );

  return (
    <Card className="w-full">
      <CardContent className="w-full flex flex-col justify-start items-start gap-3 p-0">
        <iframe
          className="w-full aspect-[1/1.2] max-sm:aspect-[1/2]"
          src={dexUrl}
        />
      </CardContent>
    </Card>
  );
}
