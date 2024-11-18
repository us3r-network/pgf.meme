"use client";
import useTradesMessage from "@/hooks/message/useTradesMessage";
import { shortPubKey } from "@/lib/shortAddress";
import { cn } from "@/lib/utils";
import { TradeData } from "@/services/trade/types";
import Link from "next/link";
import Marquee from "react-fast-marquee";
// export default function MessageMarquee() {
//   const { trades } = useTradesMessage();
//   const renderedLen = trades.length;

//   return (
//     <div className="flex overflow-hidden items-center h-full space-x-2">
//       {trades.map((trade, index) => {
//         if (index > 3) {
//           return null;
//         }
//         return (
//           <div
//             key={`${renderedLen}_${index}`}
//             className={cn(
//               " transition-transform duration-1000 message-fade-out",
//               index === 0 ? "animate-message-slide-in" : "animate-message-move"
//             )}
//           >
//             <MessageItem data={trade} />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

export default function MessageMarquee() {
  const { trades } = useTradesMessage();
  const renderedLen = trades.length;

  return (
    <div className="flex overflow-hidden items-center h-full space-x-2">
      <Marquee direction="right" loop={1} pauseOnHover>
        {trades.map((trade, index) => {
          return <MessageItem key={index} data={trade} />;
        })}
      </Marquee>
    </div>
  );
}

function MessageItem({ data }: { data: TradeData }) {
  const { user, meme, memeAmount, ethAmount, txType } = data;
  return (
    <div className="h-12 p-4 box-border bg-secondary rounded-[10px] justify-center items-center gap-2 inline-flex">
      {/* <div className="justify-start items-start gap-2 flex">
        <div className="justify-start items-start gap-2.5 flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6 rounded-[120px]" src={data.user.avatar} />
          </div>
        </div>
        <div className="text-[#16181d]  ">
          {data.user.name}
        </div>
      </div> */}
      <Link
        href={`/u/${user.walletAddress}`}
        className=" text-secondary-foreground  "
      >
        <span>{shortPubKey(user.walletAddress)}</span>
      </Link>
      <div className=" text-secondary-foreground ">
        {txType === "sell" ? "sell" : "bought"}
      </div>
      <div className=" text-secondary-foreground  text-nowrap">
        {Intl.NumberFormat("en-US", {
          maximumFractionDigits: 6,
        }).format(Number(ethAmount))}{" "}
        ETH
      </div>
      <Link
        href={`/memes/${meme.address}`}
        className="justify-start items-start gap-2 flex flex-1 overflow-hidden"
      >
        <div className="justify-start items-start gap-2.5 flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6 rounded-[120px]" src={meme.image} />
          </div>
        </div>
        <span className="text-secondary-foreground  text-nowrap">
          {meme.name}
        </span>
      </Link>
    </div>
  );
}
