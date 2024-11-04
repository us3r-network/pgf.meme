"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { TopicData } from "@/services/topic/types";
import Link from "next/link";
import { MemeData } from "@/services/meme/types";
import { UserRound } from "lucide-react";
import useHotTopics from "@/hooks/topic/useHotTopics";
import TopicCard from "./TopicCard";
import { Skeleton } from "../ui/skeleton";

export default function HomeTopics() {
  const { items, loadItems, loading } = useHotTopics();
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="w-full flex-col gap-2.5 flex">
      <div className="w-full justify-between items-end flex">
        <div className=" text-black text-[32px] font-bold">🔥Hot Topic</div>
        <Link className="text-black text-2xl font-bold" href={"/topics"}>
          View all
        </Link>
      </div>
      <div className="w-full flex flex-col items-center">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {items.map((item, idx) => {
              return (
                <CarouselItem key={item.topic.id}>
                  <HomeTopicItem data={item} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
        <CarouselPagination itemsLength={items.length} carouselApi={api} />
      </div>
      {loading && <HomeTopicSkeleton />}
    </div>
  );
}

function CarouselPagination({
  itemsLength,
  carouselApi,
}: {
  itemsLength: number;
  carouselApi: CarouselApi;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    setCurrent(carouselApi.selectedScrollSnap());

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap());
    });
  }, [carouselApi]);
  if (!carouselApi || itemsLength <= 1) {
    return null;
  }
  return (
    <div className="w-full flex justify-center gap-8 mt-6">
      {Array.from({ length: itemsLength }).map((_, index) => (
        <button
          key={index}
          className={cn(
            "w-6 h-6 rounded-full transition-all",
            current === index ? "bg-primary" : "bg-[#D9D9D9]"
          )}
          onClick={() => carouselApi.scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
<Skeleton className="rounded-[20px]" />;

export function HomeTopicSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-2 gap-4">
        {/* Left box - 50% width */}
        <div className="min-h-[680px]">
          <Skeleton className="rounded-[20px] w-full h-full" />
        </div>

        {/* Right section - 2x2 grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {/* Skeleton for each item */}
          <Skeleton className="rounded-[20px]" />
          <Skeleton className="rounded-[20px]" />
          <Skeleton className="rounded-[20px]" />
          <Skeleton className="rounded-[20px]" />
        </div>
      </div>
    </div>
  );
}
export function HomeTopicItem({
  data,
}: {
  data: {
    topic: TopicData;
    memes: MemeData[];
  };
}) {
  const { topic, memes } = data;
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-2 gap-4">
        {/* Left box - 50% width */}
        <div className="min-h-[680px]">
          <TopicCard topic={topic} />
        </div>

        {/* Right section - 2x2 grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          {memes.map((item, idx) => {
            return (
              <div key={`${item.address}_${idx}`}>
                <MemeCard meme={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MemeCard({ meme, className }: { meme: MemeData; className?: string }) {
  return (
    <Link
      className={cn(
        " w-full h-full relative rounded-2xl overflow-hidden block",
        className
      )}
      href={`/memes/${meme?.address || ""}`}
    >
      <img
        src={meme.image}
        className="w-full h-full object-cover"
        loading="lazy"
        alt={meme.name}
      />
      <div className="absolute top-0 w-full bg-gradient-to-b from-black/80 to-transparent">
        <div className="p-6 ">
          <span className="text-2xl text-white">{meme.name}</span>
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent">
        <div className="p-6 flex justify-between items-end">
          <span className="text-2xl text-white">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
              minimumFractionDigits: 0,
              notation: "compact",
            }).format(meme.stats?.marketCap || 0)}
          </span>
          <div className="justify-start items-center gap-1 flex">
            <UserRound className="size-6 stroke-white" />
            <div className="text-white text-base font-normal">
              {new Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(meme.stats?.buyersNumber || 0)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
