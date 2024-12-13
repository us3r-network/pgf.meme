"use client";

import { MemeCard } from "@/components/memes/MultiChainMemeCard";
import ButtonToggle from "@/components/ui/button-toggle";
import useLoadMeme from "@/hooks/meme/useLoadMeme";
import { Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import Loading from "@/components/Loading";

const MemeSwap = dynamic(() => import("@/components/memes/MemeSwap"), {
  ssr: false,
});
const MemeTradeChart = dynamic(
  () => import("@/components/memes/details/MemeTradeChart"),
  { ssr: false }
);
const MemeBridge = dynamic(() => import("@/components/memes/MemeBridge"), {
  ssr: false,
});
const MemeBaseInfo = dynamic(
  () => import("@/components/memes/details/MemeBaseInfo"),
  { ssr: false }
);

const chainOptions = [
  {
    value: "evm",
    label: "Base",
    icon: (
      <img
        src="/images/chain/base.png"
        alt="base"
        className="size-[40px] rounded-full"
      />
    ),
  },
  {
    value: "sol",
    label: "Solana",
    icon: (
      <img
        src="/images/chain/solana.png"
        alt="solana"
        className="size-[40px] rounded-full"
      />
    ),
  },
];
const tradeActionOptions = [
  { value: "trade", label: "Trade" },
  { value: "bridge", label: "Bridge" },
];
export default function MemeDetails({ addr }: { addr: string }) {
  const [chainType, setChainType] = useState("evm");
  const [tradeActionType, setTradeActionType] = useState("trade");
  const isSol = chainType === "sol";

  const { meme, pending } = useLoadMeme({
    address: addr,
  });
  const baseToke = meme?.baseToken;
  const solToken = meme?.solToken;
  if (pending || !meme) {
    return (
      <div className="flex justify-center items-start mt-[20%]">
        <Loading className="w-[30%] h-20 max-sm:w-[60%]" />
      </div>
    );
  }
  const memeBaseInfoEl = <MemeBaseInfo meme={meme} />;
  const SwapEl = <MemeSwap meme={meme} isSol={isSol} />;
  const enableBridge = !!baseToke?.nttConnect && !!solToken?.nttConnect;
  const tradeActionTab = (
    <>
      {enableBridge && (
        <ButtonToggle
          options={tradeActionOptions}
          value={tradeActionType}
          onChange={setTradeActionType}
        />
      )}
      <div className={cn("", tradeActionType === "trade" ? "block" : "hidden")}>
        {SwapEl}
      </div>
      {enableBridge && (
        <div
          className={cn("", tradeActionType === "trade" ? "hidden" : "block")}
        >
          <MemeBridge meme={meme} fromSol={isSol} />
        </div>
      )}
    </>
  );
  return (
    <div className="w-full flex flex-row gap-6 max-sm:flex-col max-sm:gap-3">
      <div className="flex-1 flex flex-col justify-start items-start gap-6 max-sm:gap-3">
        <MemeCard meme={meme} hideSwap noMemeDetailLink />
        <ButtonToggle
          options={chainOptions}
          value={chainType}
          onChange={setChainType}
          disabledValues={[!baseToke ? "evm" : null, !solToken ? "sol" : null]}
          onClickDisableOption={(opt) => {
            toast({
              title: `Not yet deployed to ${opt.label}`,
            });
          }}
        />
        <MemeTradeChart meme={meme} isSol={isSol} />

        <div className="w-full flex-col gap-6 hidden max-sm:flex">
          {tradeActionTab}
          {memeBaseInfoEl}
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-6 max-sm:hidden">
        {tradeActionTab}
        {memeBaseInfoEl}
      </div>
    </div>
  );
}
