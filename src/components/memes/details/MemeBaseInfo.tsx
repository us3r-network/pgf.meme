"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { useToast } from "@/hooks/use-toast";
import { shortPubKey } from "@/lib/shortAddress";
import { MemeData } from "@/services/meme/types";
import { Copy } from "lucide-react";
import Link from "next/link";
import { Address } from "viem";
import MemeActions from "../MemeActions";

export default function MemeBaseInfo({ meme }: { meme: MemeData }) {
  const { toast } = useToast();
  const token = {
    contractAddress: "0xDf975872992F5a65584aCD620F9E41e6C145628C" as Address,
    chainId: PGF_CONTRACT_CHAIN_ID,
  };
  return (
    <div className="w-[400px] flex-col justify-start items-start gap-6 flex shrink-0">
      <div className="w-full flex justify-between items-center">
        <MemeActions token={token} />
      </div>
      <div className="text-[#16181d] text-2xl font-bold font-['Inter'] capitalize leading-[33.60px]">
        {meme.name}(${meme.symbol})
      </div>
      <div className="w-full h-[400px] rounded-[20px] flex-col justify-start items-start gap-2.5 flex">
        <img
          className="w-full h-full grow shrink basis-0 rounded-[20px] object-cover"
          src={meme.image}
        />
      </div>
      <div className="w-full justify-start items-center gap-10 inline-flex">
        <Button
          className="grow shrink basis-0 h-12 px-4 py-3 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex"
          onClick={() => {
            const host = window.location.origin;
            const url = `${host}/memes/${meme.address}`;
            navigator.clipboard.writeText(url);
            toast({
              title: "URL copied",
              description: url,
            });
          }}
        >
          <div className="text-[#fefaf6] text-xl font-bold">
            Earn by Sharing
          </div>
        </Button>
      </div>
      {!!meme?.tgGroupLink && (
        <div className="w-full justify-start items-center gap-10 inline-flex">
          <Button
            className="grow shrink basis-0 h-12 px-4 py-3 bg-[#16181d] rounded-[30px] justify-center items-center gap-2.5 flex"
            onClick={() => {
              window.open(meme.tgGroupLink);
            }}
          >
            <div className="text-[#fefaf6] text-xl font-bold">
              Join Telegram Group
            </div>
          </Button>
        </div>
      )}

      <div className="self-stretch justify-start items-start gap-2.5 inline-flex">
        <div className="text-[#626976] text-base font-bold font-['Inter'] capitalize leading-relaxed">
          Created By
        </div>
        <Link
          className="grow shrink basis-0 text-right text-[#16181d] text-base font-bold font-['Inter'] leading-snug"
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
          <div className="text-[#16181d] text-base font-bold font-['Inter'] capitalize leading-snug">
            Orbitian
          </div>
        </div> */}
      </div>
      <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
        <div className="text-[#626976] text-base font-bold font-['Inter'] capitalize leading-relaxed">
          Aderess
        </div>
        <div className="grow shrink basis-0 text-right text-[#16181d] text-base font-bold font-['Inter'] leading-snug">
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
        <div className="text-[#626976] text-base font-bold font-['Inter'] capitalize leading-relaxed">
          Description
        </div>
        <div className="self-stretch text-[#16181d] text-base font-medium font-['Inter'] leading-relaxed">
          {meme.description}
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-2 flex">
        <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
          <div className="text-[#626976] text-base font-bold font-['Inter'] capitalize leading-relaxed">
            Progress
          </div>
          <div className="grow shrink basis-0 text-right text-[#16181d] text-base font-bold font-['Inter'] leading-snug">
            {Number(meme.progress)}%
          </div>
        </div>
        <Progress
          value={Number(meme.progress)}
          className="w-full bg-[#16181d]/20 h-6"
          indicatorClassName="bg-[#fad719] rounded-[20px]"
        />
      </div>
      <div className="self-stretch">
        <span className="text-[#16181d] text-base font-normal font-['Inter'] leading-snug">
          Purchases are made using a step-based price curve, and once the total
          reaches $69k, the meme coin is launched on Uniswap V3, enabling full
          buy/sell trading on the Ethereum mainnet.
          <br />
          There are{" "}
        </span>
        <span className="text-[#0b7558] text-base font-normal font-['Inter'] leading-snug">
          {meme.stats.availableAmount.toLocaleString()}
        </span>
        <span className="text-[#16181d] text-base font-normal font-['Inter'] leading-snug">
          {" "}
          tokens still available for sale in the curve and there is{" "}
        </span>
        <span className="text-[#0b7558] text-base font-normal font-['Inter'] leading-snug">
          {meme.stats.bondingCurveEth} ETH
        </span>
        <span className="text-[#16181d] text-base font-normal font-['Inter'] leading-snug">
          {" "}
          in the curve.
        </span>
      </div>
    </div>
  );
}
