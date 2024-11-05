"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-cool-inview";
import useLoadTopics from "@/hooks/topic/useLoadTopics";
import { TopicSortBy } from "@/services/topic/types";
import TopicCard from "./TopicCard";

export default function TopicList({ sortBy }: { sortBy: TopicSortBy }) {
  const { items, loading, loadItems } = useLoadTopics({
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {items.map((item, idx) => {
          return (
            <div
              key={`${item.id}`}
              ref={idx === items.length - 1 ? observe : null}
              className="aspect-square"
            >
              <TopicCard topic={item} />
            </div>
          );
        })}
        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="aspect-square rounded-2xl " />
            ))
          : null}
      </div>
    </div>
  );
}
