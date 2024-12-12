import { shortPubKey } from "@/lib/shortAddress";
import { TradeData } from "@/services/trade/types";
import Link from "next/link";
import DefaultUserAvatar from "../user/DefaultUserAvatar";

export default function MessageItem({ data }: { data: TradeData }) {
  const { user, meme, memeAmount, ethAmount, solAmount, txType } = data;
  const baseToken = meme?.baseToken;
  const solToken = meme?.solToken;
  return (
    <div className="h-12 p-4 box-border bg-secondary rounded-[10px] justify-center items-center gap-2 inline-flex mr-4">
      <Link
        href={`/u/${user.walletAddress}`}
        className=" text-secondary-foreground flex flex-row gap-2 items-center"
      >
        <DefaultUserAvatar
          address={user.walletAddress}
          className="w-6 h-6 rounded-full"
        />
        <span>{shortPubKey(user.walletAddress)}</span>
      </Link>
      <div className=" text-secondary-foreground ">
        {txType === "sell" ? "sell" : "bought"}
      </div>
      <div className=" text-secondary-foreground  text-nowrap">
        {ethAmount
          ? `${Intl.NumberFormat("en-US", {
              maximumFractionDigits: 6,
            }).format(Number(ethAmount))} ETH`
          : solAmount
          ? `${Intl.NumberFormat("en-US", {
              maximumFractionDigits: 6,
            }).format(Number(solAmount))} SOL`
          : ""}{" "}
      </div>
      <Link
        href={`/memes/${
          baseToken?.tokenAddress || solToken?.tokenAddress || meme.id
        }`}
        className="justify-start items-start gap-2 flex flex-1 overflow-hidden"
      >
        <span className="text-secondary-foreground  text-nowrap">
          {meme.name}
        </span>
        <div className="justify-start items-start gap-2.5 flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6 rounded-[120px]" src={meme.image} />
          </div>
        </div>
      </Link>
    </div>
  );
}
