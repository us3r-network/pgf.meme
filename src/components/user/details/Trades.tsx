"use client";

import TradesTable from "@/components/tables/TradesTable";
import useLoadUserTrades from "@/hooks/user/useLoadUserTrades";
import { useEffect, useState } from "react";

export default function Trades({ address }: { address: string }) {
  const { items, loadItems, loading } = useLoadUserTrades({
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
