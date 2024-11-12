"use client";

import { useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemeList from "@/components/memes/MemeList";
import { SortBy } from "@/services/meme/types";
import { useParams } from "next/navigation";
import TopicDetailsCard from "@/components/topic/TopicDetailsCard";
import useLoadTopic from "@/hooks/topic/useLoadTopic";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchInput } from "@/components/ui/search-input";

const capitalizeFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1);

export default function TopicDetails() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const tabs = [
    { name: capitalizeFirstLetter(SortBy.trending), value: SortBy.trending },
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
      <div className="w-full mb-6 max-sm:mb-3">
        {pending ? (
          <Skeleton className="rounded-2xl w-full h-[508px]" />
        ) : topic ? (
          <TopicDetailsCard topic={topic} />
        ) : null}
      </div>
      <Tabs defaultValue={SortBy.trending} className="w-full">
        <TabsList className="w-full mb-6 max-sm:mb-3">
          <div className="flex-1 flex flex-row items-center overflow-x-auto gap-6 max-sm:gap-2">
            {tabs.map((tab) => (
              <TabsTrigger value={tab.value} key={tab.value}>
                {tab.name}
              </TabsTrigger>
            ))}
          </div>
          <SearchInput
            placeholder="Search meme..."
            disabled
            className="w-[260px] max-sm:hidden"
          />
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
