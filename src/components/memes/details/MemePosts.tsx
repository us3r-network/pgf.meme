import {
  TelegramCommentsWidget,
  TelegramLoginWidget,
  TelegramPostWidget,
  TelegramShareWidget,
} from "@/components/telegram/TelegramWidget";
import { MemeData } from "@/services/meme/types";

export default function MemePosts({ meme }: { meme: MemeData }) {
  return (
    <div className="flex-col gap-10">
      {/* <TelegramLoginWidget /> */}
      <TelegramPostWidget post="us3rnetwork/25" />
      <TelegramCommentsWidget discussion="us3rnetwork/25" />
      {/* <TelegramShareWidget url="https://degencast.wtf" /> */}
    </div>
  );
}
