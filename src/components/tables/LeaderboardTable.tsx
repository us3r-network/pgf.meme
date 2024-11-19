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
import { Card, CardContent } from "../ui/card";
import DefaultUserAvatar from "../user/DefaultUserAvatar";
export default function LeaderboardTable({
  data,
}: {
  data: UserLeaderboardData[];
}) {
  return (
    <Card>
      <CardContent className="bg-primary p-2">
        <Table className=" border-separate border-spacing-y-6">
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Proportion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-card-foreground max-sm:text-xs">
            {data.map((item, index) => (
              <TableRow
                key={`${item.user.walletAddress}_${index}`}
                className="w-full h-16 py-3 px-5 bg-primary-foreground"
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
                    <span className=" font-bold">
                      {shortPubKey(item.user.walletAddress)}
                    </span>
                  </Link>
                </TableCell>
                <TableCell>
                  <span className="">
                    {new Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(Number(item.memeAmount))}{" "}
                  </span>
                </TableCell>
                <TableCell className="rounded-r-2xl">
                  <span className="text-center ">{item.proportion}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
