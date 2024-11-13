import { cn } from "@/lib/utils";
import { TopicData } from "@/services/topic/types";
import Link from "next/link";
import JoinTelegramButton from "../telegram/JoinTelegramButton";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export default function TopicCard({
  topic,
  className,
}: {
  topic: TopicData;
  className?: string;
}) {
  return (
    <Link
      className={cn("w-full h-full block", className)}
      href={`/topics/${topic.id}`}
    >
      <Card className="w-full h-full overflow-hidden">
        <CardContent
          className="w-full h-full flex flex-col justify-between p-3"
          style={{
            backgroundImage: `url(${topic.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <Badge className="text-2xl font-bold max-sm:text-base">
              #{topic.name}
            </Badge>
            <Badge
              variant={"secondary"}
              className="text-2xl font-bold max-sm:text-base"
            >
              {topic.stats.memesAmount} memes
            </Badge>
          </div>
          {topic.tgLink && (
            <div className="ml-auto">
              <JoinTelegramButton link={topic.tgLink} />
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
