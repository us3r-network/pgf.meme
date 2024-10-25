"use client";

import { MemeData } from "@/services/meme/types";
import MemeChart, { MemeChartData, mockMemeChartdata } from "./MemeChart";
import useLoadMemeOhlct from "@/hooks/trade/useLoadMemeOhlct";
import { useEffect } from "react";

export default function MemeTradeChart({ meme }: { meme: MemeData }) {
  const address = meme.address;
  const { ohlct, pending, loadMemeOhlct } = useLoadMemeOhlct({
    address: address,
  });
  useEffect(() => {
    loadMemeOhlct();
  }, []);
  return (
    <div className="w-full flex flex-col justify-start items-start gap-6">
      <div className="justify-start items-center gap-6 inline-flex">
        <div className="text-[#16181d] text-4xl font-bold font-['Inter'] capitalize leading-[50.40px]">
          {meme.name}(${meme.symbol})
        </div>
        <div className="justify-start items-center gap-2 flex">
          <div className="justify-start items-start gap-6 flex">
            <div className="text-[#16181d] text-4xl font-bold font-['Inter']">
              Market Cap:
            </div>
          </div>
          <div className="text-right text-[#16181d] text-4xl font-bold font-['Inter']">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
              minimumFractionDigits: 0,
              notation: "compact",
            }).format(meme.stats.marketCap)}
          </div>
        </div>
      </div>
      <div className="w-full h-[642px]">
        {pending ? (
          <div className="flex justify-center items-start gap-6">
            Loading...
          </div>
        ) : (
          <MemeChart data={ohlct as MemeChartData} />
        )}
      </div>
    </div>
  );
}
