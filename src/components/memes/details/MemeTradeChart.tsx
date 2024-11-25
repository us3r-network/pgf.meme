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
import CopyAddress from "@/components/CopyAddress";
import { PropsWithChildren } from "react";

export default function MemeTradeChart({ meme }: { meme: MemeData }) {
  return (
    <Card className="w-full">
      <CardContent className="w-full flex flex-col justify-start items-start gap-3 p-0">
        {/* <div className="w-full flex flex-row justify-between items-center gap-3">
          <span className="text-primary text-3xl font-bold line-clamp-1 max-sm:hidden">
            ${meme.symbol}
          </span>
          <span className="text-primary text-3xl font-bold line-clamp-1 max-sm:text-xl">
            Market Cap:{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
              minimumFractionDigits: 0,
              notation: "compact",
            }).format(meme.stats.marketCap)}
          </span>
        </div> */}
        {meme?.graduation?.poolAddress ? (
          <MemeChartGraduationAfter meme={meme} />
        ) : (
          <MemeChartGraduationBefore meme={meme} />
        )}
      </CardContent>
    </Card>
  );
}

// function GraduationAfterTable({ meme }: { meme: MemeData }) {
//   return (
//     <Tabs defaultValue="after" className="w-full h-full">
//       <TabsList className="w-full mb-6 max-sm:mb-3 flex flex-row">
//         <TabsTrigger value={"after"} className="text-[24px] h-[38px] flex-1">
//           Uniswap
//         </TabsTrigger>
//         <TabsTrigger value={"before"} className="text-[24px] h-[38px] flex-1">
//           Seed Round
//         </TabsTrigger>
//       </TabsList>

//       <TabsContent value={"after"}>
//         <ChartWrapper>
//           <MemeChartGraduationAfter meme={meme} />
//         </ChartWrapper>
//       </TabsContent>
//       <TabsContent value={"before"}>
//         <ChartWrapper>
//           <MemeChartGraduationBefore meme={meme} />
//         </ChartWrapper>
//       </TabsContent>
//     </Tabs>
//   );
// }

function ChartWrapper({ children }: PropsWithChildren) {
  return (
    <div className="w-full p-2 border rounded-2xl box-border bg-[#16181D] overflow-hidden max-sm:h-[210px]">
      {children}
    </div>
  );
}
