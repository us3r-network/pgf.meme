"use client";
import {
  TelegramCommentsWidget,
  TelegramLoginWidget,
  TelegramPostWidget,
  TelegramShareWidget,
} from "@/components/telegram/TelegramWidget";
import { Card, CardContent } from "@/components/ui/card";

import { MemeData } from "@/services/meme/types";

export default function MemePosts({ meme }: { meme: MemeData }) {
  // console.log("meme comments", meme.tgPostLink);
  if (!meme.tgPostLink) {
    return null;
  }
  return (
    <Card>
      <CardContent>
        <TelegramCommentsWidget
          discussion={meme.tgPostLink.replace("https://t.me/", "")}
        />
      </CardContent>
    </Card>
  );
}
