"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useLoadMemes from "@/hooks/meme/useLoadMemes";
import MemeCard from "@/components/memes/MemeCard";
import { SortBy } from "@/services/meme/types";
import { useInView } from "react-cool-inview";
import { cn } from "@/lib/utils";

export default function MemeList({
  sortBy,
  topicId,
  column = 1,
}: {
  sortBy: SortBy;
  topicId?: number;
  column?: number;
}) {
  const { items, loading, loadItems } = useLoadMemes({
    sortBy,
    topicId,
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
    <div className={cn("grid gap-6", `grid-cols-${column}`)}>
      {items.map((item, idx) => {
        return (
          <div
            key={`${item.address}_${idx}`}
            ref={idx === items.length - 1 ? observe : null}
          >
            <MemeCard key={item.address} meme={item} />
          </div>
        );
      })}
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[192px] rounded-[20px]" />
          ))
        : null}
    </div>
  );
}
