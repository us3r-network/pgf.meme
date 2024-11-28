import { MemeData } from "@/services/meme/types";
import { Card, CardContent } from "@/components/ui/card";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { getDexTokenWidgetUrl } from "@/lib/onchain";

export default function MemeTradeChart({
  meme,
  isSol,
}: {
  meme: MemeData;
  isSol?: boolean;
}) {
  const dexUrl = isSol
    ? getDexTokenWidgetUrl("sol", meme?.address!)
    : getDexTokenWidgetUrl(PGF_CONTRACT_CHAIN_ID, meme?.address!);
  return (
    <Card className="w-full">
      <CardContent className="w-full flex flex-col justify-start items-start gap-3 p-0">
        <iframe className="w-full aspect-[1/1.3]" src={dexUrl} />
      </CardContent>
    </Card>
  );
}
