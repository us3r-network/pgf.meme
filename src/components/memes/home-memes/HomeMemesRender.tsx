import Link from "next/link";
import { Card, CardContent } from "../../ui/card";
import { MemeData } from "@/services/meme/types";
import { cn } from "@/lib/utils";

export default function HomeMemesRender({
  memes,
  chainId,
}: {
  memes: MemeData[];
  chainId: "base" | "solana";
}) {
  return (
    <>
      {memes.map((meme) => {
        const baseToken = meme.baseToken;
        const solToken = meme.solToken;
        const token = chainId === "solana" ? solToken : baseToken;
        const priceChange = token?.priceChange?.h24 || 0;
        return (
          <Link
            key={meme.address}
            className="w-full h-fit"
            href={`/memes/${meme.address}`}
          >
            <Card key={meme.address} className="w-full border-secondary">
              <CardContent className="w-full flex-col gap-2 flex p-3 bg-background">
                <span className="w-full flex gap-1 text-primary text-2xl font-bold  max-sm:text-base">
                  <span className="line-clamp-1">{meme.name}</span>
                  <span>(${meme.symbol})</span>
                </span>
                <div className="flex gap-1 justify-between items-center">
                  <div className="flex-col gap-2 flex">
                    {" "}
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-secondary">Market Cap</div>
                      <div className="text-xs">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 0,
                          notation: "compact",
                        }).format(token?.marketCap || 0)}{" "}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-bold text-secondary">24H Volume</div>
                      <div className="text-xs">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 0,
                          notation: "compact",
                        }).format(token?.volume?.h24 || 0)}{" "}
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "text-2xl font-bold text-[#65D072]",
                      priceChange < 0 && "text-[#EF4444]"
                    )}
                  >
                    {priceChange > 0
                      ? `+${priceChange}`
                      : String(priceChange || 0)}
                    %
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </>
  );
}
