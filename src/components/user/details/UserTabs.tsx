import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Trades from "./Trades";
import Held from "./Held";
import CreatedMemes from "./CreatedMemes";

export default function UserTabs({ address }: { address: string }) {
  return (
    <Tabs defaultValue="trades" className="w-full">
      <TabsList className="w-full mb-6 max-sm:mb-3">
        <TabsTrigger value="held">Held</TabsTrigger>
        <TabsTrigger value="created">Created</TabsTrigger>
        <TabsTrigger value="trades">Trades</TabsTrigger>
      </TabsList>
      <TabsContent value="held">
        <Held address={address} />
      </TabsContent>
      <TabsContent value="created">
        <CreatedMemes address={address} />
      </TabsContent>
      <TabsContent value="trades">
        <Trades address={address} />
      </TabsContent>
    </Tabs>
  );
}
