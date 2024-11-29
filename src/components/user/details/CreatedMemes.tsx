"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-cool-inview";
import useLoadCreatedMemes from "@/hooks/user/useLoadCreatedMemes";
import Loading from "@/components/Loading";
import { MemeCard } from "@/components/memes/MultiChainMemeCard";
import NoData from "@/components/tables/NoData";

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
    <div className="flex flex-col gap-6">
      {mounted && !loading && items.length === 0 && <NoData />}
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
      {loading ? (
        <div className="w-full flex justify-center items-start">
          <Loading className="w-[30%] h-20 max-sm:w-[60%]" />
        </div>
      ) : null}
    </div>
  );
}
