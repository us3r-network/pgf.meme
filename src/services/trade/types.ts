import { MemeData } from "../meme/types";

export type TradeData = {
  user: {
    walletAddress: string;
    name?: string;
    avatar?: string;
  };
  meme: MemeData;
  txType: "buy" | "sell";
  ethAmount: number;
  solAmount: number;
  memeAmount: number;
  date: number;
  txHash: string;
};

export type OhlctData = {
  open: number;
  high: number;
  low: number;
  close: number;
  time: number;
};
