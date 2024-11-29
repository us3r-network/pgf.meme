import { PGF_CONTRACT_CHAIN_ID } from "@/constants/pgf";
import { getBlockExploreTxUrl } from "@/lib/onchain";
import { shortPubKey } from "@/lib/shortAddress";
import { cn } from "@/lib/utils";
import { TradeData } from "@/services/trade/types";
import dayjs from "dayjs";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent } from "../ui/card";
import DefaultUserAvatar from "../user/DefaultUserAvatar";
import NoData from "./NoData";

export default function TradesTable({
  data,
  showEmpty,
}: {
  data: TradeData[];
  showEmpty?: boolean;
}) {
  if (showEmpty) {
    return <NoData />;
  }
  return (
    <Card>
      <CardContent className="bg-primary p-2">
        <Table className=" border-separate border-spacing-y-2">
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>ETH</TableHead>
              <TableHead>Amount</TableHead>
              {/* <TableHead className="">Date</TableHead> */}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-card-foreground max-sm:text-xs">
            {data.map((item, index) => (
              <TableRow
                key={item.txType + "_" + index}
                className="w-full h-16 bg-primary-foreground"
              >
                <TableCell className="rounded-l-2xl">
                  <Link
                    href={`/u/${item.user.walletAddress}`}
                    className="flex flex-row items-center gap-2"
                  >
                    <DefaultUserAvatar
                      address={item.user.walletAddress}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-bold">
                      {shortPubKey(item.user.walletAddress)}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      item.txType === "buy"
                        ? "text-[#0b7558]"
                        : "text-[#e01916]"
                    )}
                  >
                    {item.txType === "buy" ? "Buy" : "Sell"}
                  </span>
                </TableCell>

                <TableCell>
                  <span>
                    {Intl.NumberFormat("en-US", {
                      maximumFractionDigits: 6,
                    }).format(Number(item.ethAmount))}
                  </span>
                </TableCell>

                <TableCell>
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(Number(item.memeAmount))}{" "}
                  </span>
                </TableCell>
                {/* <TableCell>
                <span>{dayjs(item.date * 1000).fromNow(true)}</span>
              </TableCell> */}

                <TableCell className="rounded-r-2xl">
                  <Link
                    href={getBlockExploreTxUrl(
                      PGF_CONTRACT_CHAIN_ID,
                      item.txHash
                    )}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="font-bold text-foreground p-4">🔗</span>
                    {/* <SquareArrowOutUpRight className=" stroke-[#1E1E1E] size-6 max-sm:size-4" /> */}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
