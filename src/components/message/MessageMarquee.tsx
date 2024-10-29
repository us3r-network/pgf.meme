"use client";
import useMemeMessage from "@/hooks/message/useMemeMessage";
import { shortPubKey } from "@/lib/shortAddress";
import { cn } from "@/lib/utils";
import { TradeData } from "@/services/trade/types";
export default function MessageMarquee() {
  const { messages } = useMemeMessage();
  const renderedLen = messages.length;

  return (
    <div className="flex overflow-hidden items-center h-12 space-x-2">
      {messages.map((message, index) => {
        if (index > 3) {
          return null;
        }
        return (
          <div
            key={`${renderedLen}_${index}`}
            className={cn(
              " transition-transform duration-1000 message-fade-out",
              index === 0 ? "animate-message-slide-in" : "animate-message-move"
            )}
          >
            <MessageItem data={message} />
          </div>
        );
      })}
    </div>
  );
}

function MessageItem({ data }: { data: TradeData }) {
  const { user, meme, memeAmount, ethAmount, txType } = data;
  return (
    <div className="w-[410px] h-12 p-4 bg-[#fad719] rounded-[10px] justify-center items-center gap-2 inline-flex">
      {/* <div className="justify-start items-start gap-2 flex">
        <div className="justify-start items-start gap-2.5 flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6 rounded-[120px]" src={data.user.avatar} />
          </div>
        </div>
        <div className="text-[#16181d] text-base font-normal font-['Inter'] leading-snug">
          {data.user.name}
        </div>
      </div> */}
      <div className="grow shrink basis-0 flex-col justify-center items-start gap-[5px] inline-flex">
        <div className="self-stretch text-[#fefaf6] text-base font-bold capitalize leading-snug">
          {shortPubKey(user.walletAddress)}
        </div>
      </div>
      <div className="text-black text-base font-normal font-['Inter'] leading-snug">
        {txType === "sell" ? "sell" : "bought"}
      </div>
      <div className="text-black text-base font-normal font-['Inter'] leading-snug text-nowrap">
        {ethAmount} ETH
      </div>
      <div className="justify-start items-start gap-2 flex">
        <div className="justify-start items-start gap-2.5 flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <img className="w-6 h-6 rounded-[120px]" src={meme.image} />
          </div>
        </div>
        <div className="text-[#16181d] text-base font-normal font-['Inter'] leading-snug text-nowrap">
          {meme.name}
        </div>
      </div>
    </div>
  );
}
