"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useLoadMemes from "@/hooks/meme/useLoadMemes";
import MemeCard from "@/components/memes/MemeCard";
import { SortBy } from "@/services/meme/types";
import { useInView } from "react-cool-inview";

export default function MemeList({ sortBy }: { sortBy: SortBy }) {
  const { items, loading, loadItems } = useLoadMemes({
    sortBy,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted) return;
    loadItems();
  }, [mounted]);

  const { observe } = useInView({
    // For better UX, we can grow the root margin so the data will be loaded earlier
    rootMargin: "50px 0px",
    // When the last item comes to the viewport
    onEnter: ({ unobserve }) => {
      // Pause observe when loading data
      unobserve();
      // Load more data
      loadItems();
    },
  });
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, idx) => {
          return (
            <div ref={idx === items.length - 1 ? observe : null}>
              <MemeCard key={item.id} meme={item} className="w-full h-full" />
            </div>
          );
        })}
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-[486px] rounded-[20px]" />
            ))
          : null}
      </div>
    </div>
  );
}
