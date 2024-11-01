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
        " bg-[#fefaf6] rounded-[20px] border border-[#16181d] flex-col justify-start items-center inline-flex overflow-hidden",
        "max-sm:flex-row max-sm:gap-2 max-sm:h-[170px]",
        className
      )}
      href={`/memes/${meme.address}`}
    >
      <div className="self-stretch h-[325px] flex-col justify-start items-start gap-2.5 flex max-sm:h-full max-sm:flex-1">
        <img
          className="w-full h-full self-stretch grow shrink basis-0"
          src={meme.image}
        />
      </div>
      <div className="self-stretch h-[158px] px-[30px] py-5 flex-col justify-start items-start gap-2 flex max-sm:h-full max-sm:flex-1 max-sm:p-2 max-sm:pl-0">
        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-[#16181d] text-4xl font-bold max-sm:text-2xl">
            {meme.name}
          </div>
        </div>
        <div className="self-stretch justify-center items-end inline-flex mt-auto">
          <div className="grow shrink basis-0 pr-[21px] flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch text-[#626976] text-base max-sm:text-xs">
              Market Cap
            </div>
            <div className="self-stretch text-[#16181d] text-2xl max-sm:text-base max-sm:font-bold">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 2,
                minimumFractionDigits: 0,
                notation: "compact",
              }).format(meme.stats.marketCap)}
            </div>
          </div>
          <div className="justify-start items-center gap-1 flex">
            <UserRound className="max-sm:size-5" />
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
