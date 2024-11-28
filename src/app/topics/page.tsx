import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SortBy } from "@/services/meme/types";
import { TopicSortBy } from "@/services/topic/types";
import TopicList from "@/components/topic/TopicList";
import { SearchInput } from "@/components/ui/search-input";
// import { SearchInput } from "@/components/ui/search-input";

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
        <TabsList className="w-full mb-6 max-sm:mb-3">
          <div className="flex-1 flex flex-row items-center overflow-x-auto gap-6 max-sm:gap-2">
            {tabs.map((tab) => (
              <TabsTrigger value={tab.value} key={tab.value}>
                {tab.name}
              </TabsTrigger>
            ))}
          </div>
          {/* <SearchInput
            placeholder="Search topic..."
            disabled
            className="w-[260px] max-sm:hidden"
          /> */}
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
