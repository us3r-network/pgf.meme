"use client";

import Loading from "@/components/Loading";
import MemeBaseInfo from "@/components/memes/details/MemeBaseInfo";
import MemeSwap from "@/components/memes/details/MemeSwap";
import MemeSwapWithSol from "@/components/memes/MemeSwapWithJupiter";
import MemeTradeChart from "@/components/memes/details/MemeTradeChart";
import { MemeCard } from "@/components/memes/MultiChainMemeCard";
import ButtonToggle from "@/components/ui/button-toggle";
import useLoadMeme from "@/hooks/meme/useLoadMeme";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MemeDetails() {
  const [chainType, setChainType] = useState("evm");
  const chainOptions = [
    { value: "evm", label: "Base" },
    { value: "sol", label: "Solana" },
  ];
  const isSol = chainType === "sol";
  const params = useParams<{ addr: string }>();
  const addr = params.addr;
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
  const memeSwapEl = <MemeSwap meme={meme} isSol={isSol} />;
  const memeBaseInfoEl = <MemeBaseInfo meme={meme} />;
  return (
    <div className="w-full flex flex-row gap-6 max-sm:flex-col max-sm:gap-3">
      <div className="flex-1 flex flex-col justify-start items-start gap-6 max-sm:gap-3">
        <MemeCard meme={meme} />
        <ButtonToggle
          options={chainOptions}
          value={chainType}
          onChange={setChainType}
        />
        <MemeTradeChart meme={meme} isSol={isSol} />

        <div className="w-full flex-col gap-6 hidden max-sm:flex">
          {memeSwapEl}
          {memeBaseInfoEl}
        </div>
      </div>
      <div className="w-[400px] flex flex-col gap-6 max-sm:hidden">
        {memeSwapEl}
        {memeBaseInfoEl}
      </div>
    </div>
  );
}
