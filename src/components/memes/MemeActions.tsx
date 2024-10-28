"use client";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs-underline";
import { PGFToken } from "@/services/contract/types";
import { BuyMemeForm } from "./buy/BuyMemeForm";
import { SellMemeForm } from "./sell/SellMemeForm";

export default function MemeActions({ token }: { token: PGFToken }) {
  const tabs = [
    { name: "Buy", value: "buy" },
    { name: "Sell", value: "sell" },
  ];
  return (
    <Tabs defaultValue="buy" className="w-full">
      <TabsList className="w-full mb-6">
        {tabs.map((tab) => (
          <TabsTrigger
            value={tab.value}
            className="text-[24px] h-[38px]"
            key={tab.value}
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          {tab.value === "buy" ? (
            <BuyMemeForm token={token} />
          ) : (
            <SellMemeForm token={token} />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
