"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-cool-inview";
import useLoadTopics from "@/hooks/topic/useLoadTopics";
import { TopicSortBy } from "@/services/topic/types";
import TopicCard from "./TopicCard";
import { Card, CardContent } from "../ui/card";
import { TopicAndMemes, TopicAndMemesSkeleton } from "./TopicAndMemes";

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
    <div className="">
      {items.map((item, idx) => {
        return (
          <div
            key={`${item.id}`}
            ref={idx === items.length - 1 ? observe : null}
            className="mt-4"
          >
            <Card className="w-full max-sm:hidden">
              <CardContent className="w-full">
                <TopicAndMemes
                  data={{
                    topic: item,
                    memes: item?.memes || [],
                  }}
                />
              </CardContent>
            </Card>
            <TopicCard
              topic={item}
              className="aspect-square hidden max-sm:block"
            />
          </div>
        );
      })}
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <div className="w-full mt-4" key={index}>
              <Card className="w-full max-sm:hidden">
                <CardContent className="w-full">
                  <TopicAndMemesSkeleton />
                </CardContent>
              </Card>
              <Skeleton className="w-full aspect-square hidden max-sm:block" />
            </div>
          ))
        : null}
    </div>
  );
}
