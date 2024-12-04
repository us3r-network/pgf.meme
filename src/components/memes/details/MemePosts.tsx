import { TelegramCommentsWidget } from "@/components/telegram/TelegramWidget";

import { MemeData } from "@/services/meme/types";

export default function MemePosts({ meme }: { meme: MemeData }) {
  if (!meme.tgPostLink) {
    return null;
  }
  return (
    <div className="w-full bg-background">
      <TelegramCommentsWidget
        discussion={meme.tgPostLink.replace("https://t.me/", "")}
      />
    </div>
  );
}
