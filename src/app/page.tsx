"use client";

import * as React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useLoadMemes from "@/hooks/meme/useLoadMemes";
import MemeCard from "@/components/memes/MemeCard";

export default function Home() {
  const { items, loading, loadItems } = useLoadMemes();
  React.useEffect(() => {
    loadItems();
  }, []);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-lg" />
            ))
          : items.map((item) => <MemeCard key={item.id} meme={item} />)}
      </div>
    </div>
  );
}
