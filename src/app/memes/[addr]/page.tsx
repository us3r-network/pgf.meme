"use client";

import Loading from "@/components/Loading";
import MemeBaseInfo from "@/components/memes/details/MemeBaseInfo";
import MemeSwap from "@/components/memes/MemeSwap";
import MemeSwapWithSol from "@/components/memes/MemeSwapWithJupiter";
import MemeTradeChart from "@/components/memes/details/MemeTradeChart";
import { MemeCard } from "@/components/memes/MultiChainMemeCard";
import ButtonToggle from "@/components/ui/button-toggle";
import useLoadMeme from "@/hooks/meme/useLoadMeme";
import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import MemeBridge from "@/components/memes/MemeBridge";
import { cn } from "@/lib/utils";

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
export default function MemeDetails() {
  const params = useParams<{ addr: string }>();
  const addr = params!.addr;
  const [chainType, setChainType] = useState("evm");
  const [tradeActionType, setTradeActionType] = useState("trade");
  const isSol = chainType === "sol";

  const { meme, pending, loadMeme } = useLoadMeme({
    address: addr,
  });
  useEffect(() => {
    loadMeme();
  }, []);
  if (pending) {
    return (
      <div className="flex justify-center items-start mt-[20%]">
        <Loading className="w-[30%] h-20 max-sm:w-[60%]" />
      </div>
    );
  }
  if (!meme) {
    return null;
  }
  const memeBridgeEl = (
    <Suspense fallback={<Loading />}>
      <MemeBridge meme={meme} fromSol={isSol} />
    </Suspense>
  );
  const memeSwapEl = (
    <Suspense fallback={<Loading />}>
      <MemeSwap meme={meme} isSol={isSol} />
    </Suspense>
  );
  const memeBaseInfoEl = (
    <Suspense fallback={<Loading />}>
      <MemeBaseInfo meme={meme} />
    </Suspense>
  );
  const memeTradeActionTab = (
    <>
      <ButtonToggle
        options={tradeActionOptions}
        value={tradeActionType}
        onChange={setTradeActionType}
      />
      <div className={cn("", tradeActionType === "trade" ? "block" : "hidden")}>
        {memeSwapEl}
      </div>
      <div className={cn("", tradeActionType === "trade" ? "hidden" : "block")}>
        {memeBridgeEl}
      </div>
      {/* {tradeActionType === "trade" ? memeSwapEl : memeBridgeEl} */}
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
          {memeTradeActionTab}
          {memeBaseInfoEl}
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-6 max-sm:hidden">
        {memeTradeActionTab}
        {memeBaseInfoEl}
      </div>
    </div>
  );
}
