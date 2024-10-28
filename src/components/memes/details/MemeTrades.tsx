import TradesTable from "@/components/tables/TradesTable";
import useLoadMemeTrades from "@/hooks/trade/useLoadMemeTrades";
import { MemeData } from "@/services/meme/types";
import { useEffect, useState } from "react";

export default function MemeTrades({ meme }: { meme: MemeData }) {
  const address = meme.address;
  const { items, loadItems, loading } = useLoadMemeTrades({
    address,
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (mounted) {
      loadItems();
    }
  }, [mounted]);
  if (loading) {
    return <div className="w-full flex justify-center mt-8">Loading...</div>;
  }
  return <TradesTable data={items} />;
}
