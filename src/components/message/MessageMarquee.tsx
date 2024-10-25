"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
// import Marquee from "react-fast-marquee";
export default function MessageMarquee() {
  const messageQueue = useRef<any[]>([]);
  const [renderedMessages, setRenderedMessages] = useState<any[]>([]);

  const mockMessage = useRef(0);

  // 模拟消息推送，每秒向消息队列中推送一个消息
  useEffect(() => {
    const intervalId = setInterval(() => {
      ++mockMessage.current;
      messageQueue.current.push(mockMessage.current);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // 每2秒从消息队列中取一个消息放到渲染列表
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (messageQueue.current.length > 0) {
        const message = messageQueue.current[0];
        messageQueue.current = messageQueue.current.slice(1);
        setRenderedMessages((prev) => [message, ...prev]);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  const renderedLen = renderedMessages.length;

  return (
    <div className="flex overflow-hidden items-center h-12 space-x-2">
      {renderedMessages.map((message, index) => {
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
            <MessageItem message={message} />
          </div>
        );
      })}
    </div>
  );
}

function MessageItem({ message }: { message: any }) {
  return (
    <div className="w-[410px] h-12 p-4 bg-[#fad719] rounded-[10px] justify-start items-center gap-2 inline-flex">
      <div className="justify-start items-start gap-2 flex">
        <div className="justify-start items-start gap-2.5 flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <img
              className="w-6 h-6 rounded-[120px]"
              src="https://via.placeholder.com/24x24"
            />
          </div>
        </div>
        <div className="text-[#16181d] text-base font-normal font-['Inter'] leading-snug">
          username
        </div>
      </div>
      <div className="text-black text-base font-normal font-['Inter'] leading-snug">
        bought
      </div>
      <div className="text-black text-base font-normal font-['Inter'] leading-snug text-nowrap">
        XX ETH
      </div>
      <div className="justify-start items-start gap-2 flex">
        <div className="justify-start items-start gap-2.5 flex">
          <div className="w-6 h-6 justify-center items-center flex">
            <img
              className="w-6 h-6 rounded-[120px]"
              src="https://via.placeholder.com/24x24"
            />
          </div>
        </div>
        <div className="text-[#16181d] text-base font-normal font-['Inter'] leading-snug text-nowrap">
          meme {message}
        </div>
      </div>
    </div>
  );
}
