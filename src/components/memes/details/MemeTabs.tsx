import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-underline";
import MemePosts from "./MemePosts";
import MemeTrades from "./MemeTrades";
import MemeLeaderboard from "./MemeLeaderboard";
import { MemeData } from "@/services/meme/types";

export default function MemeTabs({ meme }: { meme: MemeData }) {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full mb-6">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="trades">Trades</TabsTrigger>
        <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
      </TabsList>
      <TabsContent value="posts">
        <MemePosts meme={meme} />
      </TabsContent>
      <TabsContent value="trades">
        <MemeTrades meme={meme} />
      </TabsContent>
      <TabsContent value="leaderboard">
        <MemeLeaderboard meme={meme} />
      </TabsContent>
    </Tabs>
  );
}
