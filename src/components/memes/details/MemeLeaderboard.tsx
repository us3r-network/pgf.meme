"use client";

import LeaderboardTable from "@/components/tables/LeaderboardTable";
import useLoadMemeLeaderboard from "@/hooks/trade/useLoadMemeLeaderboard";
import { MemeData } from "@/services/meme/types";
import { useEffect, useState } from "react";

export default function MemeLeaderboard({ meme }: { meme: MemeData }) {
  const address = meme.address;
  const { items, loadItems, loading } = useLoadMemeLeaderboard({
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
  return <LeaderboardTable data={items} />;
}
