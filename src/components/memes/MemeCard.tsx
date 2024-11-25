import { cn } from "@/lib/utils";
import { MemeData } from "@/services/meme/types";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { shortPubKey } from "@/lib/shortAddress";
import DefaultUserAvatar from "../user/DefaultUserAvatar";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { DEFAULT_CHAIN } from "@/constants/chain";
import {
  dexscreenerIconUrl,
  getBlockExploreAddressUrl,
  getDexscreenerTokenUrl,
} from "@/lib/onchain";
import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";

export default function MemeCard({
  meme,
  className,
}: {
  meme: MemeData;
  className?: string;
}) {
  return (
    <Link
      className={cn("w-full h-fit", className)}
      href={`/memes/${meme.address}`}
    >
      <Card className="w-full h-full overflow-hidden">
        <CardContent className="w-full h-full overflow-hidden flex flex-row gap-3 p-3">
          <div className="h-[168px] aspect-square ">
            <Avatar className="w-full h-full object-cover rounded-lg">
              <AvatarImage
                src={meme.image}
                className="hover:scale-105 transition-all"
              />
              <AvatarFallback className="w-full h-full object-cover rounded-lg">
                Image failed
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <span className="text-primary text-2xl font-bold line-clamp-1 max-sm:text-base">
              {meme.name}
            </span>
            <div className="flex items-center gap-3">
              <div className="font-bold text-secondary">Market Cap</div>
              <div className="text-xs">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 0,
                  notation: "compact",
                }).format(meme.stats.marketCap)}{" "}
                (
                {new Intl.NumberFormat("en-US", {
                  notation: "compact",
                }).format(meme.stats.buyersNumber)}{" "}
                bought)
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-bold text-secondary">Created By</div>
              {meme?.createdBy?.walletAddress && (
                <Link
                  className="flex items-center gap-1"
                  href={`/u/${meme.createdBy.walletAddress}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DefaultUserAvatar
                    address={meme.createdBy.walletAddress}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs">
                    {shortPubKey(meme.createdBy.walletAddress)}
                  </span>
                  <div className="text-xs">from now TODO</div>
                </Link>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="font-bold text-secondary">Address</div>
              <span className="text-xs">{shortPubKey(meme.address)}</span>
            </div>

            <div className="flex items-center gap-2">
              <MemeLinkButton
                label={DEFAULT_CHAIN.blockExplorers.default.name}
                href={getBlockExploreAddressUrl(
                  PGF_CONTRACT_CHAIN_ID,
                  meme.address
                )}
                iconUrl={`${DEFAULT_CHAIN.blockExplorers.default.url}/favicon.ico`}
              />
              {!!meme.graduation && (
                <MemeLinkButton
                  label={"Dexscreener"}
                  href={getDexscreenerTokenUrl(
                    PGF_CONTRACT_CHAIN_ID,
                    meme.graduation.tokenAddress
                  )}
                  iconUrl={dexscreenerIconUrl}
                />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function MemeLinkButton({
  label,
  href,
  iconUrl,
  icon,
}: {
  label: string;
  href: string;
  iconUrl?: string;
  icon?: React.ReactNode;
}) {
  return (
    <Link href={href} target={href.startsWith("http") ? "_blank" : ""}>
      <Button
        variant={"secondary"}
        className="flex flex-row gap-1 items-center px-3 py-1"
      >
        {icon ? (
          icon
        ) : iconUrl ? (
          <Avatar className="w-6 h-6">
            <AvatarImage src={iconUrl} className="w-full h-full" />
            <AvatarFallback className="w-full h-full"></AvatarFallback>
          </Avatar>
        ) : null}
        <span className="font-normal line-clamp-1">{label}</span>
      </Button>
    </Link>
  );
}
