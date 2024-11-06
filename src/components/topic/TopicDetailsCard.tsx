import { cn } from "@/lib/utils";
import { TopicData } from "@/services/topic/types";
import Link from "next/link";
import JoinTelegramButton from "../telegram/JoinTelegramButton";

export default function TopicDetailsCard({
  topic,
  className,
}: {
  topic: TopicData;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-full rounded-2xl p-6 flex gap-6 bg-[#16181D] text-white max-sm:flex-col",
        className
      )}
    >
      <img
        src={topic.image}
        className="w-[460px] aspect-square rounded-2xl object-cover max-sm:w-full"
        loading="lazy"
        alt={topic.name}
      />
      <div className="flex-1 h-[460px] flex flex-col max-sm:w-full overflow-hidden">
        <div className="flex justify-between items-center">
          <span className="text-5xl font-bold">#{topic.name}</span>
          <div className="px-3 py-2 bg-[#fad719] rounded-full text-2xl font-bold text-[#16181D] flex items-center">
            {topic.stats?.memesAmount} memes
          </div>
        </div>
        <div className="mt-6">
          <span className="text-2xl">{topic.description}</span>
        </div>
        <div className="mt-auto">
          <JoinTelegramButton link={topic.tgLink} />
        </div>
      </div>
    </div>
  );
}
