"use client";

import { MemeData } from "@/services/meme/types";
import { Card, CardContent } from "@/components/ui/card";
import MemeChartGraduationAfter from "./MemeChartGraduationAfter";
import MemeChartGraduationBefore from "./MemeChartGraduationBefore";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-underline";

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
          <GraduationAfterTable meme={meme} />
        ) : (
          <div className="w-full h-[430px]">
            <MemeChartGraduationBefore meme={meme} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GraduationAfterTable({ meme }: { meme: MemeData }) {
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
        <div className="w-full h-[430px]">
          <MemeChartGraduationAfter meme={meme} />
        </div>
      </TabsContent>
      <TabsContent value={"before"}>
        <div className="w-full h-[430px]">
          <MemeChartGraduationBefore meme={meme} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
