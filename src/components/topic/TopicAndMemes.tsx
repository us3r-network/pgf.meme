import { cn } from "@/lib/utils";
import { TopicData } from "@/services/topic/types";
import { MemeData } from "@/services/meme/types";
import TopicCard from "./TopicCard";
import { Skeleton } from "../ui/skeleton";
import { MemeCard } from "../memes/MultiChainMemeCard";

export function TopicAndMemesSkeleton() {
  return (
    <div className="w-full">
      <div className="w-full flex flex-row gap-4 max-sm:flex-col">
        {/* Left box - 50% width */}
        <div className="aspect-square w-[30%] max-sm:w-full">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Right section - 2x2 grid */}
        <div
          className={cn(
            "flex-1 w-full grid grid-rows-2 gap-4 max-sm:grid-rows-1"
          )}
        >
          {Array.from({ length: 2 }).map((_, idx) => {
            return (
              <div
                key={`${idx}`}
                className={cn(
                  "h-full flex-1 aspect-auto",
                  idx > 1 && "max-sm:hidden"
                )}
              >
                <Skeleton className="w-full h-full" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export function TopicAndMemes({
  data,
}: {
  data: {
    topic: TopicData;
    memes: MemeData[];
  };
}) {
  const { topic, memes } = data;
  const showMems = memes.slice(0, 2);
  return (
    <div className="w-full">
      <div className="w-full flex flex-row gap-4 max-sm:flex-col">
        {/* Left box - 50% width */}
        <div className="aspect-square w-[30%] max-sm:w-full">
          <TopicCard topic={topic} />
        </div>

        {/* Right section - 2x2 grid */}
        <div
          className={cn(
            "flex-1 w-full grid grid-rows-2 gap-4 max-sm:grid-rows-1"
          )}
        >
          {showMems.map((item, idx) => {
            return (
              <div
                key={`${item.address}_${idx}`}
                className={cn(
                  "h-full flex-1 aspect-auto",
                  idx > 1 && "max-sm:hidden"
                )}
              >
                <MemeCard meme={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
