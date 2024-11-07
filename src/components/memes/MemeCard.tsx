import { cn } from "@/lib/utils";
import { MemeData } from "@/services/meme/types";
import { UserRound } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

export default function MemeCard({
  meme,
  className,
}: {
  meme: MemeData;
  className?: string;
}) {
  const { name, image } = meme;
  return (
    <Link className={cn(className)} href={`/memes/${meme.address}`}>
      <Card className="w-full h-full overflow-hidden">
        <CardContent className="w-full h-full overflow-hidden flex flex-col max-sm:flex-row max-sm:gap-2 max-sm:h-[170px] p-0">
          <img className="w-full flex-1 object-cover" src={meme.image} />
          <div className="p-6 max-sm:p-4 flex flex-col justify-between gap-2">
            <div className="text-primary text-2xl max-sm:text-2xl font-bold">
              {meme.name}
            </div>
            <div className="w-full flex justify-between items-end">
              <div className="flex flex-col gap-1">
                {/* <div className="text-[#626976] text-base max-sm:text-xs">
              Market Cap
            </div> */}
                <div className="text-secondary max-sm:font-bold">
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
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
