"use client";

import { useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-underline";
import MemeList from "@/components/memes/MemeList";
import { SortBy } from "@/services/meme/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import HomeTopics from "@/components/topic/HomeTopics";
import { useParams } from "next/navigation";
import TopicDetailsCard from "@/components/topic/TopicDetailsCard";
import useLoadTopic from "@/hooks/topic/useLoadTopic";
import { Skeleton } from "@/components/ui/skeleton";

const capitalizeFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1);

export default function TopicDetails() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const tabs = [
    { name: capitalizeFirstLetter(SortBy.trending), value: SortBy.trending },
    { name: capitalizeFirstLetter(SortBy.owned), value: SortBy.owned },
    { name: capitalizeFirstLetter(SortBy.created), value: SortBy.created },
    { name: capitalizeFirstLetter(SortBy.newest), value: SortBy.newest },
    { name: capitalizeFirstLetter(SortBy.launching), value: SortBy.launching },
    { name: capitalizeFirstLetter(SortBy.marketCap), value: SortBy.marketCap },
  ];
  const { topic, loadTopic, pending } = useLoadTopic({ id: id! });

  useEffect(() => {
    loadTopic();
  }, []);
  return (
    <div className="w-full">
      <div className="w-full mb-6">
        {pending ? (
          <Skeleton className="rounded-2xl w-full h-[508px]" />
        ) : topic ? (
          <TopicDetailsCard topic={topic} />
        ) : null}
      </div>
      <Tabs defaultValue={SortBy.trending} className="w-full">
        <TabsList className="w-full mb-6">
          {tabs.map((tab) => (
            <TabsTrigger
              value={tab.value}
              className="text-[24px] h-[38px]"
              key={tab.value}
            >
              {tab.name}
            </TabsTrigger>
          ))}
          <div className="w-[460px] h-[60px] ml-auto max-sm:hidden">
            <div className="w-full h-full relative">
              <Input
                className="w-full h-full box-border py-3 pr-10 rounded-[20px] border-4 border-primary grow shrink basis-0 text-[#626976] text-base font-normal leading-snug"
                placeholder="search your favorite meme"
                disabled
              />
              <Search className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 transform text-muted-foreground" />
            </div>
          </div>
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.value}>
            <MemeList sortBy={tab.value} topicId={id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
