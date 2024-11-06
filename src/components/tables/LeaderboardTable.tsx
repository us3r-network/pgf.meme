import { shortPubKey } from "@/lib/shortAddress";
import { UserLeaderboardData } from "@/services/user/types";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
export default function LeaderboardTable({
  data,
}: {
  data: UserLeaderboardData[];
}) {
  return (
    <Table className=" border-separate border-spacing-y-6">
      <TableHeader>
        <TableRow className="text-[#858584]">
          <TableHead className="">User</TableHead>
          <TableHead className="">ETH</TableHead>
          <TableHead className="">Proportion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-[#fefaf6] max-sm:text-xs">
        {data.map((item, index) => (
          <TableRow
            key={`${item.user.walletAddress}_${index}`}
            className="w-full h-16 py-3 px-5 bg-[#3b3b3b]"
          >
            <TableCell className="rounded-l-2xl">
              <Link href={`/u/${item.user.walletAddress}`}>
                <span className=" font-bold">
                  {shortPubKey(item.user.walletAddress)}
                </span>
              </Link>
            </TableCell>
            <TableCell>
              <span className="">
                {Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 6,
                }).format(Number(item.ethAmount))}
              </span>
            </TableCell>
            <TableCell className="rounded-r-2xl">
              <span className="text-center ">{item.proportion}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
