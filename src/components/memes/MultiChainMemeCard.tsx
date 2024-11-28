import { cn } from "@/lib/utils";
import { MemeData } from "@/services/meme/types";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { shortPubKey } from "@/lib/shortAddress";
import DefaultUserAvatar from "../user/DefaultUserAvatar";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { DEFAULT_CHAIN } from "@/constants/chain";
import {
  dexscreenerIconUrl,
  getScanUrl,
  getDexTokenUrl,
  getEvmChainName,
  getGmgnTokenUrl,
  gmgnIconUrl,
  solscanIconUrl,
} from "@/lib/onchain";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import MemeShareButton from "./details/MemeShareButton";
import { Separator } from "../ui/separator";

export default function MemeCardLink({
  meme,
  className,
}: {
  meme: MemeData;
  className?: string;
}) {
  return (
    <Link className={cn("w-full", className)} href={`/memes/${meme.address}`}>
      <MemeCard meme={meme} hideShare />
    </Link>
  );
}

export function MemeCard({
  meme,
  className,
  hideShare,
}: {
  meme: MemeData;
  className?: string;
  hideShare?: boolean;
}) {
  return (
    <Card className="w-full h-fit overflow-hidden">
      <CardContent className="w-full overflow-hidden p-3">
        <div className="flex flex-row gap-3 ">
          {" "}
          <div className="h-[94px] aspect-square ">
            <Avatar className="w-full h-full object-cover rounded-lg">
              <AvatarImage
                src={meme.image}
                className="hover:scale-105 transition-all"
              />
              <AvatarFallback className="w-full h-full object-cover rounded-lg">
                Image failed
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <span className="text-primary text-2xl font-bold line-clamp-1 max-sm:text-base">
              {meme.name} (${meme.symbol})
            </span>
            <div className="flex items-center gap-3">
              <div className="font-bold text-secondary">Total Market Cap</div>
              <div className="text-xs">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0,
                  notation: "compact",
                }).format(meme.stats.marketCap || 0)}{" "}
                (
                {new Intl.NumberFormat("en-US", {
                  notation: "compact",
                }).format(meme.stats.buyersNumber || 0)}{" "}
                bought)
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-bold text-secondary">Created By</div>
              {meme?.createdBy?.walletAddress && (
                <Link
                  className="flex items-center gap-1"
                  href={`/u/${meme.createdBy.walletAddress}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DefaultUserAvatar
                    address={meme.createdBy.walletAddress}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs">
                    {shortPubKey(meme.createdBy.walletAddress)}
                  </span>
                  <div className="text-xs">
                    {dayjs(meme.created_at).fromNow()}
                  </div>
                </Link>
              )}
            </div>
          </div>
          {!hideShare && (
            <div className="ml-auto">
              <MemeShareButton meme={meme} />
            </div>
          )}
        </div>
        <Separator className="h-1 w-full bg-primary my-3" />
        <div className="flex flex-row gap-3 ">
          <div className="flex-1">
            <MemeInfoOnChain meme={meme} />
          </div>
          <Separator className="h-auto w-1 bg-primary" />
          <div className="flex-1">
            <MemeInfoOnChain meme={meme} isSol />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MemeInfoOnChain({ meme, isSol }: { meme: MemeData; isSol?: boolean }) {
  // TODO - isSol
  const marketCap = isSol
    ? meme.stats.marketCap || 0
    : meme.stats.marketCap || 0;
  const buyersNumber = isSol
    ? meme.stats.buyersNumber || 0
    : meme.stats.buyersNumber || 0;
  const tokenAddress = isSol ? meme.address : meme.address;

  const scanName = isSol
    ? "Solscan"
    : DEFAULT_CHAIN.blockExplorers.default.name;
  const scanUrl = isSol
    ? getScanUrl("sol", tokenAddress)
    : getScanUrl(PGF_CONTRACT_CHAIN_ID, tokenAddress);
  const scanIconUrl = isSol
    ? solscanIconUrl
    : `${DEFAULT_CHAIN.blockExplorers.default.url}/favicon.ico`;

  const dexUrl = isSol
    ? getDexTokenUrl("sol", meme?.address!)
    : getDexTokenUrl(PGF_CONTRACT_CHAIN_ID, meme?.address!);

  const gmgnUrl = isSol
    ? getGmgnTokenUrl("sol", meme?.address!)
    : getGmgnTokenUrl(PGF_CONTRACT_CHAIN_ID, meme?.address!);

  const chainNameStr = isSol
    ? "solana"
    : getEvmChainName(PGF_CONTRACT_CHAIN_ID);
  const chainName =
    chainNameStr.charAt(0).toUpperCase() + chainNameStr.slice(1);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div className="font-bold text-secondary">{chainName} Market Cap</div>
        <div className="text-xs">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
            notation: "compact",
          }).format(marketCap)}{" "}
          (
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
          }).format(buyersNumber)}{" "}
          bought)
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="font-bold text-secondary">{chainName} Address</div>
        <span className="text-xs">{shortPubKey(tokenAddress)}</span>
      </div>

      <div className="flex items-center gap-2">
        <MemeLinkButton label={scanName} href={scanUrl} iconUrl={scanIconUrl} />
        <MemeLinkButton
          label={"Dexscreener"}
          href={dexUrl}
          iconUrl={dexscreenerIconUrl}
        />
        <MemeLinkButton label={"GMGN"} href={gmgnUrl} iconUrl={gmgnIconUrl} />
      </div>
    </div>
  );
}

function MemeLinkButton({
  label,
  href,
  iconUrl,
  icon,
}: {
  label: string;
  href: string;
  iconUrl?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link href={href} target={href.startsWith("http") ? "_blank" : ""}>
      <Button
        variant={"secondary"}
        className="flex flex-row gap-1 items-center px-3 py-1"
        onClick={(e) => e.stopPropagation()}
      >
        {icon ? (
          icon
        ) : iconUrl ? (
          <Avatar className="w-6 h-6">
            <AvatarImage src={iconUrl} className="w-full h-full" />
            <AvatarFallback className="w-full h-full"></AvatarFallback>
          </Avatar>
        ) : null}
        <span className="font-normal line-clamp-1">{label}</span>
      </Button>
    </Link>
  );
}
