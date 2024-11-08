import { cn } from "@/lib/utils";
import { TopicData } from "@/services/topic/types";
import Link from "next/link";
import JoinTelegramButton from "../telegram/JoinTelegramButton";
import { Card, CardContent } from "../ui/card";

export default function TopicDetailsCard({
  topic,
  className,
}: {
  topic: TopicData;
  className?: string;
}) {
  return (
    <Card className={cn("w-full h-full", className)}>
      <CardContent className="w-full h-full flex gap-6  max-sm:flex-col">
        <img
          src={topic.image}
          className="w-[460px] aspect-square rounded-2xl object-cover max-sm:w-full"
          loading="lazy"
          alt={topic.name}
        />
        <div className="flex-1 h-[460px] flex flex-col max-sm:w-full overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="px-3 py-2 bg-primary rounded-full text-2xl font-bold text-primary-foreground flex items-center">
              #{topic.name}
            </div>
            <div className="px-3 py-2 bg-secondary rounded-full text-2xl font-bold text-secondary-foreground flex items-center">
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
      </CardContent>
    </Card>
  );
}
