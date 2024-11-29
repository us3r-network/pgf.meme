"use client";

import Loading from "@/components/Loading";
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
    return (
      <div className="w-full aspect-video flex justify-center items-start mt-[20%]">
        <Loading className="w-[30%] h-20 max-sm:w-[60%]" />
      </div>
    );
  }
  return (
    <TradesTable
      data={items}
      showEmpty={mounted && !loading && items.length === 0}
    />
  );
}
