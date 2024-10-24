import LeaderboardTable from "@/components/tables/LeaderboardTable";
import { MemeData } from "@/services/meme/types";

export default function MemeLeaderboard({ meme }: { meme: MemeData }) {
  return <LeaderboardTable data={[]} />;
}
