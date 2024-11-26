"use client";

import Loading from "@/components/Loading";
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
    return (
      <div className="w-full aspect-video flex justify-center items-start mt-[20%]">
        <Loading className="w-[30%] h-20 max-sm:w-[60%]" />
      </div>
    );
  }
  return <OwnedMemesTable data={items} />;
}
