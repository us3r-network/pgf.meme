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
import { isMobile } from "react-device-detect";
import { Card, CardContent } from "@/components/ui/card";

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
    <Card className="w-full">
      <CardContent className="w-full flex flex-col justify-start items-start gap-6">
        <div className="text-primary max-w-sm:text-4xl text-2xl font-bold">
          Market Cap:
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 2,
            minimumFractionDigits: 0,
            notation: "compact",
          }).format(meme.stats.marketCap)}
        </div>
        {meme?.graduation?.poolAddress ? (
          <GraduationAfterChart meme={meme} />
        ) : (
          <GraduationBeforeChart meme={meme} />
        )}
      </CardContent>
    </Card>
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
    <div className="w-full pb-[75%] relative">
      <div className="absolute inset-0">
        <MemeChart data={ohlct as MemeChartData} />
      </div>
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
        <div className="w-full pb-[75%] relative">
          <div className="absolute inset-0">
            {pending ? (
              <div className="flex justify-center items-start gap-6">
                Loading...
              </div>
            ) : (
              <MemeChart data={ohlct as MemeChartData} />
            )}
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
