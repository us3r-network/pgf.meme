"use client";

import { Progress } from "@/components/ui/progress";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { useToast } from "@/hooks/use-toast";
import { shortPubKey } from "@/lib/shortAddress";
import { MemeData } from "@/services/meme/types";
import { Copy } from "lucide-react";
import Link from "next/link";
import { Address } from "viem";
import MemeActions from "../MemeActions";
import MemeShareButton from "./MemeShareButton";
import JoinTelegramButton from "@/components/telegram/JoinTelegramButton";
import { Card, CardContent } from "@/components/ui/card";

export default function MemeBaseInfo({ meme }: { meme: MemeData }) {
  const { toast } = useToast();
  const token = {
    contractAddress: meme.address as Address,
    chainId: PGF_CONTRACT_CHAIN_ID,
  };
  return (
    <div className="w-full flex-col justify-start items-start gap-6 flex shrink-0">
      <Card className="w-full border-secondary">
        <CardContent>
          <MemeActions token={token} />
        </CardContent>
      </Card>

      <Card className="w-full border-secondary">
        <CardContent className="w-full flex flex-col gap-6">
          <div className="text-primary text-2xl font-bold  capitalize leading-[33.60px]">
            {meme.name}(${meme.symbol})
          </div>
          <div className="w-full pb-[100%] relative">
            <div className="absolute inset-0">
              <img
                className="w-full h-full grow shrink basis-0 rounded-[20px] object-cover"
                src={meme.image}
              />
            </div>
          </div>
          <div className="w-full justify-start items-center gap-10 inline-flex">
            <MemeShareButton meme={meme} />
          </div>
          {!!meme?.tgGroupLink && (
            <div className="w-full justify-start items-center gap-10 inline-flex">
              <JoinTelegramButton link={meme.tgGroupLink} />
            </div>
          )}

          <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
            <div className="text-secondary text-base font-bold  capitalize leading-relaxed">
              Created By
            </div>
            <Link
              className="grow shrink basis-0 text-right text-card-foreground text-base font-bold  leading-snug"
              href={`/u/${meme.createdBy.walletAddress}`}
            >
              {shortPubKey(meme.createdBy.walletAddress)}
            </Link>
            {/* <div className="grow shrink basis-0 h-6 rounded-[20px] justify-end items-center gap-1 flex">
          <div className="justify-start items-start gap-2.5 flex">
            <div className="w-6 h-6 justify-center items-center flex">
              <img
                className="w-6 h-6 rounded-[120px]"
                src="https://via.placeholder.com/24x24"
              />
            </div>
          </div>
          <div className="text-card-foreground text-base font-bold  capitalize leading-snug">
            Orbitian
          </div>
        </div> */}
          </div>
          <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
            <div className="text-secondary text-base font-bold  capitalize leading-relaxed">
              Aderess
            </div>
            <div className="grow shrink basis-0 text-right text-card-foreground text-base font-bold  leading-snug">
              {shortPubKey(meme.address)}
            </div>
            <Copy
              className=" cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(meme.address);
                toast({
                  title: "Address copied",
                  description: meme.address,
                });
              }}
            />
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
            <div className="text-secondary text-base font-bold  capitalize leading-relaxed">
              Description
            </div>
            <div className="self-stretch text-card-foreground text-base font-medium  leading-relaxed">
              {meme.description}
            </div>
          </div>
          <div className="self-stretch flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
              <div className="text-secondary text-base font-bold  capitalize leading-relaxed">
                Progress
              </div>
              <div className="grow shrink basis-0 text-right text-card-foreground text-base font-bold  leading-snug">
                {Number(meme.progress)}%
              </div>
            </div>
            <Progress
              value={Number(meme.progress)}
              className="w-full bg-secondary h-6"
              indicatorClassName="bg-primary rounded-[20px]"
            />
          </div>
          <div className="self-stretch">
            <span className="text-card-foreground text-base font-normal  leading-snug">
              Purchases are made using a step-based price curve, and once the
              total reaches $69k, the meme coin is launched on Uniswap V3,
              enabling full buy/sell trading on the Ethereum mainnet.
              <br />
              There are{" "}
            </span>
            <span className="text-primary text-base font-normal  leading-snug">
              {meme.stats.availableAmount.toLocaleString()}
            </span>
            <span className="text-card-foreground text-base font-normal  leading-snug">
              {" "}
              tokens still available for sale in the curve and there is{" "}
            </span>
            <span className="text-primary text-base font-normal  leading-snug">
              {meme.stats.bondingCurveEth} ETH
            </span>
            <span className="text-card-foreground text-base font-normal  leading-snug">
              {" "}
              in the curve.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
