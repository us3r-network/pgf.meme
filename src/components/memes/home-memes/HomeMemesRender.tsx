import Link from "next/link";
import { Card, CardContent } from "../../ui/card";
import { MemeData } from "@/services/meme/types";

export default function HomeMemesRender({ memes }: { memes: MemeData[] }) {
  return (
    <Card className="w-full">
      <CardContent className="w-full flex-col gap-3 flex p-3">
        <div className="w-full justify-between items-center flex">
          <div className="flex-1  flex items-center gap-6 max-sm:gap-3">
            <span className="text-2xl font-bold text-primary max-sm:text-2xl">
              🔥Top Volume
            </span>
          </div>
        </div>

        {memes.map((meme) => {
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
                        <div className="font-bold text-secondary">
                          Market Cap
                        </div>
                        <div className="text-xs">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 0,
                            notation: "compact",
                          }).format(meme.stats.marketCap)}{" "}
                          (
                          {new Intl.NumberFormat("en-US", {
                            notation: "compact",
                          }).format(meme.stats.buyersNumber)}{" "}
                          bought)
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-secondary">
                          24H Volume
                        </div>
                        <div className="text-xs">
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 0,
                            notation: "compact",
                          }).format(meme.stats.marketCap)}{" "}
                          (
                          {new Intl.NumberFormat("en-US", {
                            notation: "compact",
                          }).format(meme.stats.buyersNumber)}{" "}
                          bought)
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-[#65D072]">
                      +99%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
