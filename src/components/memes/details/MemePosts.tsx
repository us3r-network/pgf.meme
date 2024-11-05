"use client";
import {
  TelegramCommentsWidget,
  TelegramLoginWidget,
  TelegramPostWidget,
  TelegramShareWidget,
} from "@/components/telegram/TelegramWidget";

import { MemeData } from "@/services/meme/types";

export default function MemePosts({ meme }: { meme: MemeData }) {
  console.log("meme commentss", meme);
  if (!meme.tgGroupLink) {
    return null;
  }
  return <TelegramCommentsWidget discussion={meme.tgGroupLink} />;
}
