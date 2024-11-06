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

export default function OwnedMemesTable({ data }: { data: OwnedMemeData[] }) {
  return (
    <Table className=" border-separate border-spacing-y-6">
      <TableHeader>
        <TableRow className="text-[#858584]">
          <TableHead className="">Token</TableHead>
          <TableHead className="">Amount</TableHead>
          <TableHead className="">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-[#fefaf6] max-sm:text-xs">
        {data.map((item, index) => (
          <TableRow
            key={`${item.user.walletAddress}_${index}`}
            className="w-full h-16 py-3 px-5 bg-[#3b3b3b]"
          >
            <TableCell className="rounded-l-2xl">
              <Link href={`/memes/${item.meme.address}`}>
                <span className=" font-bold">
                  {shortPubKey(item.meme.address)}
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
              <span className="text-center ">
                ～ $
                {Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 6,
                }).format(Number(item.usdAmount || 0))}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
