"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import MemeCard from "@/components/memes/MemeCard";
import { useInView } from "react-cool-inview";
import useLoadCreatedMemes from "@/hooks/meme/useLoadCreatedMemes";

export default function CreatedMemes({ address }: { address: string }) {
  const { items, loading, loadItems } = useLoadCreatedMemes({
    address,
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
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-sm:gap-3">
        {items.map((item, idx) => {
          return (
            <div
              key={`${item.address}_${idx}`}
              ref={idx === items.length - 1 ? observe : null}
            >
              <MemeCard
                key={item.address}
                meme={item}
                className="w-full h-full"
              />
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
