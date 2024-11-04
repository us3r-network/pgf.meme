import { cn } from "@/lib/utils";
import { TopicData } from "@/services/topic/types";
import Link from "next/link";
import JoinTelegramButton from "../telegram/JoinTelegramButton";

export default function TopicCard({
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
      href={`/topics/${topic.id}`}
    >
      <img
        src={topic.image}
        className="w-full h-full object-cover"
        alt={topic.name}
      />
      <div className="absolute top-0 w-full bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex justify-between items-center p-6 text-white">
          <h1 className="text-4xl font-bold">#{topic.name}</h1>
          <span className="text-2xl">{topic.stats.memesAmount} memes</span>
        </div>
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex justify-between items-center p-6 text-white">
          {topic.tgLink && <JoinTelegramButton link={topic.tgLink} />}
        </div>
      </div>
    </Link>
  );
}
