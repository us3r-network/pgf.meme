"use client";

import { Progress } from "@/components/ui/progress";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { shortPubKey } from "@/lib/shortAddress";
import { MemeData } from "@/services/meme/types";
import Link from "next/link";
import { Address } from "viem";
import MemeActions from "../trade/MemeActions";
import MemeShareButton from "./MemeShareButton";
import JoinTelegramButton from "@/components/telegram/JoinTelegramButton";
import MemeSwap from "./MemeSwap";
import { Card, CardContent } from "@/components/ui/card";
import CopyAddress from "@/components/CopyAddress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import {
  dexscreenerIconUrl,
  getBlockExploreAddressUrl,
  getDexscreenerTokenUrl,
} from "@/lib/onchain";
import { DEFAULT_CHAIN } from "@/constants/chain";

export default function MemeBaseInfo({ meme }: { meme: MemeData }) {
  const token = {
    contractAddress: meme.address as Address,
    chainId: PGF_CONTRACT_CHAIN_ID,
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <Card className="w-full border-secondary">
        <CardContent>
          {meme.graduation?.poolAddress ? (
            <MemeSwap token={token} />
          ) : (
            <MemeActions token={token} />
          )}
        </CardContent>
      </Card>

      <Card className="w-full border-secondary">
        <CardContent className="w-full flex flex-col gap-6">
          <div className="w-full flex flex-row gap-2">
            <img
              className="w-[160px] h-[160px] rounded-[20px] object-cover"
              src={meme.image}
            />
            <div className="flex-1">
              <span className="text-primary text-lg">{meme.name}</span>
              <br />
              <span className="font-normal text-xs">{meme.description}</span>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <span className="text-secondary font-bold">Progress</span>
            <span className="text-secondary font-bold">
              {Number(meme.progress)}%
            </span>
          </div>
          <Progress
            value={Number(meme.progress)}
            className="w-full bg-primary/20 h-6"
            indicatorClassName="bg-primary rounded-full"
          />
          <div className=" break-words">
            Purchases are made using a step-based price curve, and once the
            total reaches $69k, the meme coin is launched on Uniswap V3,
            enabling full buy/sell trading on the Ethereum mainnet. There are{" "}
            <span className="text-primary text-base font-bold ">
              {meme.stats.availableAmount.toLocaleString()}
            </span>{" "}
            tokens still available for sale in the curve and there is{" "}
            <span className="text-primary text-base font-bold">
              {Intl.NumberFormat("en-US", {
                maximumFractionDigits: 6,
                minimumFractionDigits: 0,
              }).format(meme.stats.bondingCurveEth)}{" "}
              ETH
            </span>{" "}
            in the curve.
          </div>
          <LinkRow
            label="Created By"
            href={`/u/${meme.createdBy.walletAddress}`}
            text={shortPubKey(meme.createdBy.walletAddress)}
          />
          {meme.topic && (
            <LinkRow
              label="Topic"
              href={`/topics/${meme.topic.id}`}
              text={`#${meme.topic.name}`}
            />
          )}

          <CopyAddress address={meme.address} label="Address" />
          <LinkRow
            label={DEFAULT_CHAIN.blockExplorers.default.name}
            href={getBlockExploreAddressUrl(
              PGF_CONTRACT_CHAIN_ID,
              meme.address
            )}
            iconUrl={`${DEFAULT_CHAIN.blockExplorers.default.url}/favicon.ico`}
            text={shortPubKey(meme.address)}
          />
          {!!meme.graduation && (
            <LinkRow
              label={"Dexscreener"}
              href={getDexscreenerTokenUrl(
                PGF_CONTRACT_CHAIN_ID,
                meme.graduation.tokenAddress
              )}
              iconUrl={dexscreenerIconUrl}
              text={shortPubKey(meme.graduation.tokenAddress)}
            />
          )}

          <MemeShareButton meme={meme} />
          {!!meme?.tgPostLink && (
            <div className="hidden max-sm:block">
              <JoinTelegramButton link={meme?.tgPostLink} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function LinkRow({
  label,
  href,
  iconUrl,
  text,
}: {
  label: string;
  href: string;
  iconUrl?: string;
  text: string;
}) {
  return (
    <div className="flex flex-row justify-between items-center">
      <span className="text-secondary font-bold">{label}</span>
      <Link
        className="flex flex-row gap-1 items-center"
        href={href}
        target={href.startsWith("http") ? "_blank" : ""}
      >
        {iconUrl && (
          <Avatar className="w-6 h-6">
            <AvatarImage src={iconUrl} className="w-full h-full" />
            <AvatarFallback className="w-full h-full"></AvatarFallback>
          </Avatar>
        )}
        <span className="font-normal line-clamp-1">{text}</span>
      </Link>
    </div>
  );
}
