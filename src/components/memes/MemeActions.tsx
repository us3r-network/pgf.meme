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
import useReferral from "@/hooks/app/useReferral";

export default function MemeActions({ token }: { token: PGFToken }) {
  const { referral } = useReferral();
  // @bufan
  console.log("referral", referral);

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
