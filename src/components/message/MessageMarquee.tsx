"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
// import Marquee from "react-fast-marquee";
export default function MessageMarquee() {
  const messageQueue = useRef<any[]>([]);
  const messageCounter = useRef(0);
  const [renderedMessages, setRenderedMessages] = useState<any[]>([]);

  // 每秒向消息队列中推送一个消息
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log("messageCounter", messageCounter.current);
      if (messageCounter.current > 20) {
        clearInterval(intervalId);
        return;
      }
      messageCounter.current = messageCounter.current + 1;
      messageQueue.current = [...messageQueue.current, messageCounter.current];
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // 每三秒从消息队列中取一个消息放到渲染列表
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (messageQueue.current.length > 0) {
        setRenderedMessages((prev) => [messageQueue.current[0], ...prev]);
        messageQueue.current = messageQueue.current.slice(1);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  // 超过6个每三秒删除渲染列表中最右侧的消息
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (messageCounter.current < 6) {
        return;
      }
      setRenderedMessages((prev) => {
        if (prev.length > 6) {
          return prev.slice(0, prev.length - 1);
        }
        return prev;
      });
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);
  console.log("renderedMessages", renderedMessages);

  return (
    <div className="flex overflow-hidden items-center h-12 space-x-2">
      {renderedMessages.map((message, index) => (
        <div
          key={message}
          className={cn(
            "",
            index === 0
              ? "animate-message-slide-in animate-message-shake"
              : "transition-transform duration-500"
          )}
        >
          <MessageItem />
        </div>
      ))}
    </div>
  );
}

function MessageItem() {
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
          meme name
        </div>
      </div>
    </div>
  );
}
