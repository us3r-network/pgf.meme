import { shortPubKey } from "@/lib/shortAddress";
import { OwnedMemeData } from "@/services/user/types";
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
import ClaimRewordsAction from "../user/ClaimRewordsAction";

export default function OwnedMemesTable({ data }: { data: OwnedMemeData[] }) {
  return (
    <Card>
      <CardContent className="bg-primary p-2">
        <Table className=" border-separate border-spacing-y-6">
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Rewards</TableHead>
              <TableHead>Claim</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-card-foreground max-sm:text-xs">
            {data.map((item, index) => {
              const hasReferralReward = item.referralReward;
              const rewardAmount = item?.referralReward?.amount;
              return (
                <TableRow
                  key={`${item.user.walletAddress}_${index}`}
                  className="w-full h-16 py-3 px-5 bg-primary-foreground"
                >
                  <TableCell className="rounded-l-2xl">
                    <Link href={`/memes/${item.meme.address}`}>
                      <span className=" font-bold">
                        {shortPubKey(item.meme.address)} (${item.meme.symbol})
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
                  <TableCell>
                    <span className="">
                      {hasReferralReward
                        ? new Intl.NumberFormat("en-US", {
                            notation: "compact",
                          }).format(Number(rewardAmount))
                        : "——"}
                    </span>
                  </TableCell>
                  <TableCell className="rounded-r-2xl">
                    {hasReferralReward ? (
                      <ClaimRewordsAction data={item} />
                    ) : (
                      <span className="text-center ">——</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
