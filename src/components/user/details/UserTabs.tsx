import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-underline";
import Posts from "./Posts";
import Trades from "./Trades";
import Owned from "./Owned";

export default function UserTabs({ address }: { address: string }) {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="trades">Trades</TabsTrigger>
        <TabsTrigger value="owned">Owned</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <Posts address={address} />
      </TabsContent>
      <TabsContent value="trades">
        <Trades address={address} />
      </TabsContent>
      <TabsContent value="owned">
        <Owned address={address} />
      </TabsContent>
    </Tabs>
  );
}
