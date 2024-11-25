"use client";
import useTradesMessage from "@/hooks/message/useTradesMessage";
import Marquee from "react-fast-marquee";
import MessageItem from "./MessageItem";

export default function MessageMarquee() {
  const { trades, currentMessage, handleMarqueeComplete } = useTradesMessage();
  return (
    <div className="flex overflow-hidden items-center h-full space-x-2">
      {currentMessage && (
        <Marquee
          direction="right"
          gradient={false}
          play={true}
          speed={50}
          onFinish={handleMarqueeComplete}
          pauseOnHover
        >
          {trades.map((trade, index) => {
            return <MessageItem key={trade.txHash} data={trade} />;
          })}
        </Marquee>
      )}
    </div>
  );
}
