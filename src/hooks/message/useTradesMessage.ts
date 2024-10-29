import { API_BASE_URL } from "@/constants";
import { TradeData } from "@/services/trade/types";
import { useEffect, useRef, useState } from "react";
import io, { Socket } from "socket.io-client";

type EventsMap = {
  memeTrades: string;
};
export default function useTradesMessage() {
  const [socket, setSocket] = useState<Socket<EventsMap, EventsMap> | null>(
    null
  );
  const messageQueue = useRef<TradeData[]>([]);
  const [trades, setTrades] = useState<TradeData[]>([]);

  useEffect(() => {
    const newSocket = io(API_BASE_URL, {
      transports: ["websocket"],
      path: "/pgf-api/websocket",
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to websocket");
    });

    newSocket.on("memeTrades", (data) => {
      console.log("Received message", data);
      messageQueue.current.push(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // 每3秒从消息队列中取一个消息放到渲染列表
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (messageQueue.current.length > 0) {
        const message = messageQueue.current[0];
        messageQueue.current = messageQueue.current.slice(1);
        setTrades((prev) => [message, ...prev]);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  return { trades };
}
