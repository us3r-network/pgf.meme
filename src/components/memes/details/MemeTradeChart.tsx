"use client";

import { MemeData } from "@/services/meme/types";
import { Card, CardContent } from "@/components/ui/card";
import { getDexTokenWidgetUrl } from "@/lib/onchain";
import { DEFAULT_CHAINID } from "@/constants/chain";

export default function MemeTradeChart({
  meme,
  isSol,
}: {
  meme: MemeData;
  isSol?: boolean;
}) {
  const baseDexUrl = getDexTokenWidgetUrl(
    DEFAULT_CHAINID,
    meme?.solToken?.poolAddress
  );
  const solDexUrl = getDexTokenWidgetUrl("sol", meme?.solToken?.poolAddress);

  return (
    <Card className="w-full">
      <CardContent className="w-full flex flex-col justify-start items-start gap-3 p-0">
        <div className="w-full aspect-[1/1] max-sm:aspect-[1/1.5]">
          {isSol ? (
            <iframe className="w-full h-full" src={solDexUrl} />
          ) : (
            <iframe className="w-full h-full" src={baseDexUrl} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
