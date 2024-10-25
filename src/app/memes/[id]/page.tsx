"use client";

import MemeBaseInfo from "@/components/memes/details/MemeBaseInfo";
import MemeTabs from "@/components/memes/details/MemeTabs";
import MemeTrade from "@/components/memes/details/MemeTrade";
import { useParams } from "next/navigation";

export default function MemeDetails() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  return (
    <div className="flex justify-center items-start gap-6">
      <MemeBaseInfo meme={{} as any} />
      <div className="flex-1 grow shrink basis-0 self-stretch flex-col justify-start items-start gap-6 flex">
        <MemeTrade meme={{} as any} />
        <MemeTabs meme={{} as any} />
      </div>
    </div>
  );
}
