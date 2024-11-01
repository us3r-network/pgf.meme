"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { TopicData } from "@/services/topic/types";
import Link from "next/link";
import Image from "next/image";
import { MemeData } from "@/services/meme/types";

export default function HomeTopics() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const items = Array.from({ length: 5 }).map((_, index) => (
    <CarouselItem key={index}>
      <HomeTopicItem />
    </CarouselItem>
  ));

  return (
    <div className="w-full flex-col gap-2.5 flex">
      <div className="w-full justify-between items-end flex">
        <div className=" text-black text-[32px] font-bold leading-[44.80px]">
          🔥Hot Topic
        </div>
        <div className="text-black text-2xl font-bold leading-[33.60px]">
          View all
        </div>
      </div>
      <div className="w-full flex flex-col items-center">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>{items}</CarouselContent>
        </Carousel>
        <div className="w-full flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                current === index ? "bg-primary" : "bg-primary/50"
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export function HomeTopicItem() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Left box - 50% width */}
        <div>
          <TopicCard topic={null as any} />
        </div>

        {/* Right section - 2x2 grid */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <MemeCard meme={null as any} />
          </div>
          <div>
            <MemeCard meme={null as any} />
          </div>
          <div>
            <MemeCard meme={null as any} />
          </div>
          <div>
            <MemeCard meme={null as any} />
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicCard({
  topic,
  className,
}: {
  topic: TopicData;
  className?: string;
}) {
  return (
    <Link
      className={cn(
        "w-full h-full relative rounded-2xl overflow-hidden block",
        className
      )}
      href={`/topics/${topic?.id || ""}`}
    >
      <img
        src={`https://picsum.photos/400/400?random=1`}
        className="w-full h-full"
        alt="topic image"
      />
      <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-between items-center p-6 text-white">
          <h1 className="text-4xl font-bold">#Dogs</h1>
          <span className="text-2xl">120 memes</span>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-between items-center p-6 text-white">
          <div className="grow shrink basis-0 h-12 px-4 py-3 bg-[#28a7e8] rounded-[30px] justify-center items-center gap-6 flex">
            <div className="text-white text-xl font-bold font-['Inter']">
              Follow Topic & Join Telegram
            </div>
          </div>
        </div>
      </div>
    </Link>
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
        src={`https://picsum.photos/400/400?random=1`}
        className="w-full h-full"
        alt="topic image"
      />
      <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-black/80 to-transparent">
        <div className="p-6 ">
          <span className="text-2xl text-white">120 memes</span>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent">
        <div className="p-6 flex justify-between items-end">
          <span className="text-2xl text-white">$24.4K</span>
          <span className="text-base text-white">1</span>
        </div>
      </div>
    </Link>
  );
}
