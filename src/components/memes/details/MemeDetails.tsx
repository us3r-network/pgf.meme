"use client";

import { MemeCard } from "@/components/memes/MultiChainMemeCard";
import ButtonToggle from "@/components/ui/button-toggle";
import useLoadMeme from "@/hooks/meme/useLoadMeme";
import { Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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

  const { meme, pending, loadMeme } = useLoadMeme({
    address: addr,
  });
  useEffect(() => {
    loadMeme();
  }, []);
  if (!meme) {
    return null;
  }
  const memeBaseInfoEl = (
    <Suspense fallback={<Skeleton className="w-full h-[600px]" />}>
      <MemeBaseInfo meme={meme} />
    </Suspense>
  );
  const BridgeEl = (
    <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
      <MemeBridge meme={meme} fromSol={isSol} />
    </Suspense>
  );
  const SwapEl = (
    <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
      <MemeSwap meme={meme} isSol={isSol} />
    </Suspense>
  );
  const tradeActionTab = (
    <>
      <ButtonToggle
        options={tradeActionOptions}
        value={tradeActionType}
        onChange={setTradeActionType}
      />
      {tradeActionType === "trade" ? SwapEl : null}
      <div className={cn("", tradeActionType === "trade" ? "hidden" : "block")}>
        {BridgeEl}
      </div>
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
