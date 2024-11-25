"use client";

import OwnedMemesTable from "@/components/tables/OwnedMemesTable";
import useLoadOwnedMemes from "@/hooks/user/useLoadOwnedMemes";
import { useEffect, useState } from "react";

export default function Held({ address }: { address: string }) {
  const { items, loadItems, loading } = useLoadOwnedMemes({
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
  return <OwnedMemesTable data={items} />;
}
