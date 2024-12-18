import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MemeList from "@/components/memes/MemeList";
import { SortBy } from "@/services/meme/types";
import MemeLaunchFloatingBtn from "@/components/memes/MemeLaunchFloatingBtn";
import { cn } from "@/lib/utils";
// import HomeMemes from "@/components/memes/home-memes/HomeMemes";

const capitalizeFirstLetter = (str: string) =>
  str[0].toUpperCase() + str.slice(1);

export default function Home() {
  const tabs = [
    { name: capitalizeFirstLetter(SortBy.trending), value: SortBy.trending },
    { name: capitalizeFirstLetter(SortBy.newest), value: SortBy.newest },
    { name: capitalizeFirstLetter(SortBy.marketCap), value: SortBy.marketCap },
  ];
  return (
    <>
      {" "}
      <div className="w-full">
        <div className="w-full flex gap-4 relative">
          <Tabs defaultValue={SortBy.trending} className="flex-1">
            <TabsList className="w-full mb-6 max-sm:mb-3">
              <div className="flex-1 flex flex-row items-center overflow-x-auto gap-6 max-sm:gap-2">
                {tabs.map((tab) => (
                  <TabsTrigger value={tab.value} key={tab.value}>
                    {tab.name}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>

            {tabs.map((tab) => (
              <TabsContent value={tab.value} key={tab.value}>
                <MemeList sortBy={tab.value} />
              </TabsContent>
            ))}
          </Tabs>

          {/* <div className="w-[340px]">
        <HomeMemes />
      </div> */}
        </div>
      </div>
      <div
        className={cn(
          "w-screen  max-w-screen-2xl p-6 max-sm:p-3 fixed left-1/2 -translate-x-1/2 bottom-0 h-0 py-0 box-border"
        )}
      >
        <div className=" absolute bottom-[100px] right-[40px]">
          <MemeLaunchFloatingBtn />
        </div>
      </div>
    </>
  );
}
