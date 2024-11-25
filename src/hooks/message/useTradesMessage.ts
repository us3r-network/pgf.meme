"use client";

import { API_BASE_URL } from "@/constants";
import { TradeData } from "@/services/trade/types";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

export default function useTradesMessage() {
  const socket = useRef<Socket | null>(null);
  // const messageQueue = useRef<TradeData[]>([]);
  const [trades, setTrades] = useState<TradeData[]>([]);
  const [currentMessage, setCurrentMessage] = useState<TradeData | null>(null); // 当前滚动的消息

  useEffect(() => {
    socket.current = io(API_BASE_URL, {
      transports: ["websocket"],
      path: "/pgf-api/websocket",
    });

    socket.current.on("connect", () => {
      console.log("Connected to websocket");
    });

    socket.current.on("memeTrades", (data) => {
      setTrades((prev) => {
        if (prev.find((item) => item.txHash === data.txHash)) return prev;
        return [...prev, data];
      });
    });

    return () => {
      // 清理 WebSocket 事件监听和连接
      if (socket.current) {
        socket.current.off("memeTrades");
        socket.current.disconnect();
        socket.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // 如果当前没有消息正在滚动，从队列中取下一条消息
    if (!currentMessage && trades.length > 0) {
      setCurrentMessage(trades[0]);
      setTrades((prev) => prev.slice(1)); // 移除已滚动的消息
    }
  }, [trades, currentMessage]);

  const handleMarqueeComplete = () => {
    // 当前消息滚动完成后清除
    setCurrentMessage(null);
  };

  return { trades, currentMessage, handleMarqueeComplete };
}
