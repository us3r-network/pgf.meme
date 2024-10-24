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
        " bg-[#fefaf6] rounded-[20px] border border-[#16181d] flex-col justify-start items-center inline-flex",
        className
      )}
      href={`/memes/${meme.address}`}
    >
      <div className="self-stretch h-[325px] rounded-tl-[20px] rounded-tr-[20px] flex-col justify-start items-start gap-2.5 flex">
        <img
          className="h-full self-stretch grow shrink basis-0 rounded-tl-[20px] rounded-tr-[20px]"
          src={meme.image}
        />
      </div>
      <div className="self-stretch h-[158px] px-[30px] py-5 rounded-bl-xl rounded-br-xl flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch h-[50px] flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch text-[#16181d] text-4xl font-bold font-['Inter'] capitalize leading-[50.40px]">
            {meme.name}
          </div>
        </div>
        <div className="self-stretch justify-center items-end inline-flex">
          <div className="grow shrink basis-0 pr-[21px] flex-col justify-start items-start gap-2 inline-flex">
            <div className="self-stretch text-[#626976] text-base font-normal font-['Inter'] leading-[17.60px]">
              Market Cap
            </div>
            <div className="self-stretch text-[#16181d] text-2xl font-normal font-['Inter'] leading-[33.60px]">
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
            <UserRound />
            <div className="text-[#16181d] text-base font-normal font-['Inter'] leading-snug">
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(meme.stats.buyersNumber)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
