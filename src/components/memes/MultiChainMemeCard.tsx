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
import CopyAddress from "../CopyAddress";
import MemeSwapDialogWithUniswap from "./MemeSwapDialogWithUniswap";
import { MemeSwapDialogWithJupiter } from "./MemeSwapDialogWithJupiter";
import { DEFAULT_CHAIN } from "@/constants/chain";
import { CAST_TOKEN_ADDRESS } from "@/constants";

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
  const deployerAddress = meme.deployerEVMAddress || meme.deployerSolanaAddress;
  const memeInfo = (
    <div className="flex flex-row gap-3 ">
      {" "}
      <div className="h-[94px] aspect-square max-sm:h-[70px]">
        <Avatar className="w-full h-full object-cover rounded-lg">
          <AvatarImage
            src={meme.image}
            className="hover:scale-105 transition-all"
          />
          <AvatarFallback className="w-full h-full object-cover rounded-lg">
            <span className="text-3xl font-bold text-secondary max-sm:text-xl">
              {meme.name[0].toUpperCase()}
            </span>
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <span className="text-primary text-2xl font-bold line-clamp-1 max-sm:text-base">
          {meme.name} (${meme.symbol})
        </span>
        <div className="flex items-center gap-3">
          <div className="font-bold text-secondary max-sm:text-xs">
            Total Market Cap
          </div>
          <div className="text-xs">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
              minimumFractionDigits: 0,
              notation: "compact",
            }).format(totalMarketCap)}{" "}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="font-bold text-secondary  max-sm:text-xs">
            Created By
          </div>
          {baseToken.tokenAddress === CAST_TOKEN_ADDRESS ? (
            <Link
              className="flex items-center gap-1"
              href="https://degencast.ai"
              onClick={(e) => e.stopPropagation()}
              target="_blank"
            >
              <span className="text-xs font-bold">degencast.ai</span>
              <div className="text-xs">{dayjs(meme.createdAt).fromNow()}</div>
            </Link>
          ) : (
            deployerAddress && (
              <Link
                className="flex items-center gap-1"
                href={`/u/${deployerAddress}`}
                onClick={(e) => e.stopPropagation()}
              >
                <DefaultUserAvatar
                  address={deployerAddress}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-xs">{shortPubKey(deployerAddress)}</span>
                <div className="text-xs">{dayjs(meme.createdAt).fromNow()}</div>
              </Link>
            )
          )}
        </div>
      </div>
      {!hideShare && (
        <div className="ml-auto max-sm:hidden">
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
            href={`/memes/${
              baseToken?.tokenAddress || solToken?.tokenAddress || meme.id
            }`}
          >
            {memeInfo}
          </Link>
        )}
        {(!!baseToken || !!solToken) && (
          <Separator className="h-1 w-full bg-primary my-3" />
        )}

        <div className="flex flex-row gap-3 max-sm:flex-col">
          {baseToken && (
            <div className="flex-1">
              <MemeInfoOnChain
                token={baseToken}
                chainName={DEFAULT_CHAIN.name}
                scanName={DEFAULT_CHAIN.blockExplorers.default.name}
                scanIconUrl={`${DEFAULT_CHAIN.blockExplorers.default.url}/favicon.ico`}
                scanUrl={getScanUrl(DEFAULT_CHAIN.id, baseToken?.tokenAddress)}
                dexUrl={getDexTokenUrl(
                  DEFAULT_CHAIN.id,
                  baseToken?.tokenAddress!
                )}
                gmgnUrl={getGmgnTokenUrl(
                  DEFAULT_CHAIN.id,
                  baseToken?.tokenAddress!
                )}
                swapButton={
                  hideSwap ? null : (
                    <MemeSwapDialogWithUniswap token={baseToken} />
                  )
                }
              />
            </div>
          )}

          {baseToken && solToken && (
            <Separator className="h-auto w-1 bg-primary max-sm:w-full max-sm:h-1" />
          )}

          {solToken && (
            <div className="flex-1">
              <MemeInfoOnChain
                token={solToken}
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
          )}
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
      <div className="flex items-center gap-3 max-sm:gap-2">
        <div className="font-bold text-secondary max-sm:text-xs">
          {chainName} Market Cap
        </div>
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

      <div className="flex items-center gap-3 max-sm:gap-2">
        <div className="font-bold text-secondary max-sm:text-xs">
          {chainName} Address
        </div>
        {/* <span className="text-xs">{shortPubKey(token?.tokenAddress)}</span> */}
        <CopyAddress address={token?.tokenAddress} size="small" />
      </div>

      <div className="flex items-center gap-2 max-sm:gap-1">
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
        className="flex flex-row gap-1 items-center px-3 py-1 max-sm:px-1"
        onClick={(e) => e.stopPropagation()}
      >
        {icon ? (
          icon
        ) : iconUrl ? (
          <Avatar className="size-6">
            <AvatarImage src={iconUrl} className="w-full h-full" />
            <AvatarFallback className="w-full h-full"></AvatarFallback>
          </Avatar>
        ) : null}
        <span className="font-normal line-clamp-1 max-sm:text-xs">{label}</span>
      </Button>
    </Link>
  );
}
