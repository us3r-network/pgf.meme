import { cn } from "@/lib/utils";
import { MemeData } from "@/services/meme/types";
import { UserRound } from "lucide-react";
import Link from "next/link";

export default function MemeCard({
  meme,
  className,
}: {
  meme: MemeData;
  className?: string;
}) {
  const { name, image } = meme;
  return (
    <Link
      className={cn(
        "bg-[#fefaf6] rounded-[20px] border border-[#16181d] flex flex-col max-sm:flex-row max-sm:gap-2 max-sm:h-[170px]",
        className
      )}
      href={`/memes/${meme.address}`}
    >
      <div className="max-sm:size-40">
        <img
          className="w-full rounded-t-[20px] max-sm:rounded-tr-none max-sm:rounded-l-[20px]"
          src={meme.image}
        />
      </div>
      <div className="p-6 max-sm:p-4 h-full flex flex-col justify-between gap-2 flex-1">
        <div className="text-[#16181d] text-4xl max-sm:text-2xl font-bold">
          {meme.name}
        </div>
        <div className="w-full flex justify-between items-end">
          <div className="flex flex-col gap-1">
            <div className="text-[#626976] text-base max-sm:text-xs">
              Market Cap
            </div>
            <div className="text-[#16181d] text-2xl max-sm:text-base max-sm:font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
                notation: "compact",
              }).format(meme.stats.marketCap)}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <UserRound />
            <span className="text-[#16181d] text-base">
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(meme.stats.buyersNumber)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
