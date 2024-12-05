import { cn } from "@/lib/utils";
import { MemeData, TokenData } from "@/services/meme/types";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { shortPubKey } from "@/lib/shortAddress";
import DefaultUserAvatar from "../user/DefaultUserAvatar";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import {
  dexscreenerIconUrl,
  getScanUrl,
  getDexTokenUrl,
  getGmgnTokenUrl,
  gmgnIconUrl,
  solscanIconUrl,
} from "@/lib/onchain";
import MemeShareButton from "./details/MemeShareButton";
import { Separator } from "../ui/separator";
import { base } from "viem/chains";
import CopyAddress from "../CopyAddress";
import MemeSwapDialogWithUniswap from "./MemeSwapDialogWithUniswap";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { MemeSwapDialogWithJupiter } from "./MemeSwapDialogWithJupiter";
import { Address } from "viem";

export function MemeCard({
  meme,
  className,
  hideShare,
  hideSwap,
  noMemeDetailLink,
}: {
  meme: MemeData;
  className?: string;
  hideShare?: boolean;
  hideSwap?: boolean;
  noMemeDetailLink?: boolean;
}) {
  const baseToken = meme.baseToken;
  const solToken = meme.solToken;
  const totalMarketCap =
    Number(baseToken?.marketCap || 0) + Number(solToken?.marketCap || 0);
  const totalBuysNumber =
    Number(baseToken?.txns?.h24 || 0) + Number(solToken?.txns?.h24 || 0);
  const memeInfo = (
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
            }).format(totalMarketCap)}{" "}
            (Total{" "}
            {new Intl.NumberFormat("en-US", {
              notation: "compact",
            }).format(totalBuysNumber)}{" "}
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
              <div className="text-xs">{dayjs(meme.createdAt).fromNow()}</div>
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
  );
  return (
    <Card className="w-full h-fit overflow-hidden">
      <CardContent className="w-full overflow-hidden p-3 bg-white">
        {noMemeDetailLink ? (
          memeInfo
        ) : (
          <Link
            className={cn("w-full", className)}
            href={`/memes/${meme.address}`}
          >
            {memeInfo}
          </Link>
        )}
        <Separator className="h-1 w-full bg-primary my-3" />
        <div className="flex flex-row gap-3 ">
          <div className="flex-1">
            <MemeInfoOnChain
              token={meme.baseToken}
              chainName={base.name}
              scanName={base.blockExplorers.default.name}
              scanIconUrl={`${base.blockExplorers.default.url}/favicon.ico`}
              scanUrl={getScanUrl(base.id, baseToken?.tokenAddress)}
              dexUrl={getDexTokenUrl(base.id, baseToken?.tokenAddress!)}
              gmgnUrl={getGmgnTokenUrl(base.id, baseToken?.tokenAddress!)}
              swapButton={
                hideSwap ? null : (
                  <MemeSwapDialogWithUniswap
                    token={{
                      contractAddress: (baseToken?.tokenAddress ||
                        "") as Address,
                      chainId: PGF_CONTRACT_CHAIN_ID,
                      logoURI: meme.image,
                    }}
                  />
                )
              }
            />
          </div>
          <Separator className="h-auto w-1 bg-primary" />
          <div className="flex-1">
            <MemeInfoOnChain
              token={meme.solToken}
              chainName={"Solana"}
              scanName={"Solscan"}
              scanIconUrl={solscanIconUrl}
              scanUrl={getScanUrl("sol", solToken?.tokenAddress)}
              dexUrl={getDexTokenUrl("sol", solToken?.tokenAddress!)}
              gmgnUrl={getGmgnTokenUrl("sol", solToken?.tokenAddress!)}
              swapButton={
                hideSwap ? null : (
                  <MemeSwapDialogWithJupiter
                    token={{
                      address: solToken?.tokenAddress || "",
                    }}
                  />
                )
              }
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function MemeInfoOnChain({
  token,
  scanName,
  scanUrl,
  scanIconUrl,
  dexUrl,
  gmgnUrl,
  chainName,
  swapButton,
}: {
  token: TokenData;
  scanName: string;
  scanUrl: string;
  scanIconUrl: string;
  dexUrl: string;
  gmgnUrl: string;
  chainName: string;
  swapButton?: React.ReactNode;
}) {
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
          }).format(token?.marketCap || 0)}{" "}
          (
          {new Intl.NumberFormat("en-US", {
            notation: "compact",
          }).format(token?.txns?.h24?.buys || 0)}{" "}
          bought)
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="font-bold text-secondary">{chainName} Address</div>
        {/* <span className="text-xs">{shortPubKey(token?.tokenAddress)}</span> */}
        <CopyAddress address={token?.tokenAddress} size="small" />
      </div>

      <div className="flex items-center gap-2">
        <MemeLinkButton label={scanName} href={scanUrl} iconUrl={scanIconUrl} />
        <MemeLinkButton
          label={"Dexscreener"}
          href={dexUrl}
          iconUrl={dexscreenerIconUrl}
        />
        <MemeLinkButton label={"GMGN"} href={gmgnUrl} iconUrl={gmgnIconUrl} />
        {swapButton}
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