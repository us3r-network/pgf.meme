"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useCast from "@/hooks/farcaster/useCast";
import { NeynarCast } from "@/services/neynar";
import dayjs from "dayjs";
import Link from "next/link";

const getEmbedImg = (embeds: NeynarCast["embeds"]) => {
  const img = embeds?.find((embed) => {
    const metadata = embed?.metadata;
    const contentType = metadata?.content_type;
    return contentType?.startsWith("image/");
  });
  return img;
};

export default function MemeCast({ hash }: { hash: string }) {
  const { cast, isLoading } = useCast(hash);
  const img = cast?.embeds ? getEmbedImg(cast?.embeds) : null;
  if (isLoading) {
    <div className="w-full flex flex-row gap-3">
      <Skeleton className="size-10" />
      <div className="flex-1 flex-col gap-[10px]">
        <div className="flex flex-row justify-between items-center gap-3">
          <Skeleton className="w-[100px] h-4" />
          <Skeleton className="w-[100px] h-4" />
        </div>
        <Skeleton className="w-[200px] h-16" />
      </div>
    </div>;
  }

  if (!cast) return null;
  return (
    <Link
      className="w-full flex flex-row gap-3"
      href={`https://warpcast.com/${cast?.author.username}/${hash}`}
      target="_blank"
    >
      <Avatar className="size-10">
        <AvatarImage src={cast?.author?.pfp_url} />
        <AvatarFallback>
          {cast?.author?.display_name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col gap-[10px]">
        <div className="flex flex-row justify-between items-center gap-3">
          <div className="flex-1 flex flex-row items-center font-bold text-primary">
            <div className="line-clamp-1">{cast?.author.display_name}</div>
            <div>(@{cast?.author.username})</div>
          </div>
          <div className="font-normal text-xs">
            {dayjs(cast?.timestamp).fromNow()}
          </div>
        </div>

        <span className="font-normal text-xs">{cast?.text}</span>
        {img && (
          <img
            src={img.url}
            width={128}
            height={128}
            alt=""
            className=" object-contain"
          />
        )}
      </div>
    </Link>
  );
}
