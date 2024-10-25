import TradesTable from "@/components/tables/TradesTable";
import { MemeData } from "@/services/meme/types";

export default function MemeTrades({ meme }: { meme: MemeData }) {
  return <TradesTable data={[]} />;
}
