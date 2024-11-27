import Link from "next/link";
import { Card, CardContent } from "../../ui/card";
import TopicCard from "../TopicCard";
import { TopicData } from "@/services/topic/types";

export default function HomeTopicRender({ topic }: { topic: TopicData }) {
  return (
    <Card className="w-full">
      <CardContent className="w-full flex-col gap-3 flex p-3">
        <div className="w-full justify-between items-center flex">
          <div className="flex-1  flex items-center gap-6 max-sm:gap-3">
            <span className="text-2xl font-bold text-primary max-sm:text-2xl">
              🔥Hot Topic
            </span>
            {/* <Loading className="max-sm:flex-1 max-sm:max-w-24 max-sm:h-8" /> */}
          </div>
          <Link
            className=" text-2xl font-bold text-primary max-sm:text-base"
            href={"/topics"}
          >
            <span>View all</span>
          </Link>
        </div>

        <div className="w-full aspect-square">
          {topic && <TopicCard topic={topic} />}
        </div>
      </CardContent>
    </Card>
  );
}
