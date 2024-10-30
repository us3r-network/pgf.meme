"use client";

import { MemeData } from "@/services/meme/types";
import MemeChart, { MemeChartData, mockMemeChartdata } from "./MemeChart";
import useLoadMemeOhlct from "@/hooks/trade/useLoadMemeOhlct";
import { useEffect } from "react";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-underline";

const getDextoolsChainId = (chainId: number) => {
  // ether, base,
  switch (chainId) {
    case 8453:
      return "base";
    case 1:
      return "ether";
    default:
      return "";
  }
};
const getDexWidgetChartUrl = ({
  chainId,
  poolAddress,
}: {
  chainId: number;
  poolAddress: string;
}) => {
  const chainID = getDextoolsChainId(chainId);
  if (!chainID || !poolAddress) {
    return "";
  }
  return `https://www.dextools.io/widget-chart/en/${chainID}/pe-light/${poolAddress}?theme=dark&chartType=1&chartResolution=30&drawingToolbars=false&chartInUsd=true`;
};

export default function MemeTradeChart({ meme }: { meme: MemeData }) {
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
      {meme?.graduation?.poolAddress ? (
        <GraduationAfterChart meme={meme} />
      ) : (
        <GraduationBeforeChart meme={meme} />
      )}
    </div>
  );
}

function GraduationBeforeChart({ meme }: { meme: MemeData }) {
  const { address } = meme;
  const { ohlct, pending, loadMemeOhlct } = useLoadMemeOhlct({
    address: address,
  });
  useEffect(() => {
    loadMemeOhlct();
  }, []);
  if (pending) {
    return (
      <div className="flex justify-center items-start gap-6">Loading...</div>
    );
  }
  return (
    <div className="w-full h-[642px]">
      <MemeChart data={ohlct as MemeChartData} />
    </div>
  );
}

function GraduationAfterChart({ meme }: { meme: MemeData }) {
  const { address } = meme;
  const { ohlct, pending, loadMemeOhlct } = useLoadMemeOhlct({
    address: address,
  });
  const dexUrl = getDexWidgetChartUrl({
    chainId: PGF_CONTRACT_CHAIN_ID,
    poolAddress: meme.graduation?.poolAddress || "",
  });
  useEffect(() => {
    loadMemeOhlct();
  }, []);
  if (pending) {
    return (
      <div className="flex justify-center items-start gap-6">Loading...</div>
    );
  }
  return (
    <Tabs defaultValue="after" className="w-full h-full">
      <TabsList className="w-full mb-6 flex flex-row">
        <TabsTrigger value={"after"} className="text-[24px] h-[38px] flex-1">
          Uniswap
        </TabsTrigger>
        <TabsTrigger value={"before"} className="text-[24px] h-[38px] flex-1">
          Seed Round
        </TabsTrigger>
      </TabsList>

      <TabsContent value={"after"}>
        <div className="w-full h-[642px]">
          <iframe className="w-full h-full" src={dexUrl} />
        </div>
      </TabsContent>
      <TabsContent value={"before"}>
        <div className="w-full h-[642px]">
          {pending ? (
            <div className="flex justify-center items-start gap-6">
              Loading...
            </div>
          ) : (
            <MemeChart data={ohlct as MemeChartData} />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
