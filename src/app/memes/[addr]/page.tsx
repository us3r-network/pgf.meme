"use client";

import MemeBaseInfo from "@/components/memes/details/MemeBaseInfo";
import MemeTabs from "@/components/memes/details/MemeTabs";
import MemeTradeChart from "@/components/memes/details/MemeTradeChart";
import useLoadMeme from "@/hooks/meme/useLoadMeme";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function MemeDetails() {
  const params = useParams<{ addr: string }>();
  const addr = params.addr;
  const { meme, pending, loadMeme } = useLoadMeme({
    address: addr,
  });
  useEffect(() => {
    loadMeme();
  }, []);
  if (pending) {
    return (
      <div className="flex justify-center items-start gap-6">Loading...</div>
    );
  }
  if (!meme) {
    return null;
  }
  return (
    <div className="flex justify-center items-start gap-6">
      <div className="flex-1 flex-col justify-start items-start gap-6 flex">
        <MemeTradeChart meme={meme} />
        <MemeTabs meme={meme} />
      </div>
      <MemeBaseInfo meme={meme} />
    </div>
  );
}
