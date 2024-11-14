"use client";
import {
  TelegramCommentsWidget,
  TelegramLoginWidget,
  TelegramPostWidget,
  TelegramShareWidget,
} from "@/components/telegram/TelegramWidget";
import { Card, CardContent } from "@/components/ui/card";

import { MemeData } from "@/services/meme/types";
import PostsInnerMemeInfo from "./PostsInnerMemeInfo";
import { Separator } from "@/components/ui/separator";

export default function MemePosts({ meme }: { meme: MemeData }) {
  // console.log("meme comments", meme.tgPostLink);
  if (!meme.tgPostLink) {
    return null;
  }
  return (
    <Card>
      <CardContent className="bg-background">
        <div className="max-sm:hidden">
          <PostsInnerMemeInfo meme={meme} />
          <Separator className="my-6 h-1 bg-primary rounded-full" />
        </div>
        <TelegramCommentsWidget
          discussion={meme.tgPostLink.replace("https://t.me/", "")}
        />
      </CardContent>
    </Card>
  );
}
