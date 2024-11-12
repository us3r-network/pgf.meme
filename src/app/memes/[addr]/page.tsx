"use client";

import Loading from "@/components/Loading";
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
      <div className="flex justify-center items-start mt-[20%]">
        <Loading className="w-[30%] h-20 max-sm:w-[60%]" />
      </div>
    );
  }
  if (!meme) {
    return null;
  }
  return (
    <div className="w-full flex flex-row gap-6 max-sm:flex-col max-sm:gap-3">
      <div className="flex-1 flex flex-col justify-start items-start gap-6 max-sm:gap-3">
        <MemeTradeChart meme={meme} />
        <div className="w-full hidden max-sm:block">
          <MemeBaseInfo meme={meme} />
        </div>
        <MemeTabs meme={meme} />
      </div>
      <div className="w-[400px] max-sm:hidden">
        <MemeBaseInfo meme={meme} />
      </div>
    </div>
  );
}
