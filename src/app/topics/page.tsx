"use client";

import * as React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-underline";
import { SortBy } from "@/services/meme/types";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import HomeTopics from "@/components/topic/HomeTopics";
import { TopicSortBy } from "@/services/topic/types";
import TopicList from "@/components/topic/TopicList";

const capitalizeFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1);

export default function Topics() {
  const tabs = [
    {
      name: capitalizeFirstLetter(TopicSortBy.trending),
      value: TopicSortBy.trending,
    },
    {
      name: capitalizeFirstLetter(TopicSortBy.newest),
      value: TopicSortBy.newest,
    },
    {
      name: capitalizeFirstLetter(TopicSortBy.memes),
      value: TopicSortBy.memes,
    },
  ];
  return (
    <div className="w-full">
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
          <div className="w-[460px] h-[60px] ml-auto">
            <div className="w-full h-full relative">
              <Input
                className="w-full h-full box-border py-3 pr-10 rounded-[20px] border border-[#16181d] grow shrink basis-0 text-[#626976] text-base font-normal leading-snug"
                placeholder="search your favorite meme"
                disabled
              />
              <Search className="absolute right-2 top-1/2 h-6 w-6 -translate-y-1/2 transform text-muted-foreground" />
            </div>
          </div>
        </TabsList>

        {tabs.map((tab) => (
          <TabsContent value={tab.value} key={tab.value}>
            <TopicList sortBy={tab.value} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
