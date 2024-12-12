import type { TopicData } from "../topic/types";

export type MemeData = {
  // Meme 基本信息
  id: number;
  symbol: string;
  name: string;
  image: string;
  description: string;
  createdAt: Date;
  tgPostLink?: string; // tg channel post link
  topic?: TopicData;

  deployerEVMAddress: string;
  deployerSolanaAddress: string;
  deployerFid: string;
  deployerFcName: string;
  castHash?: string;

  deployerTwitterHandle?: string;
  tweetId?: string;

  baseToken: TokenData; // 部署在base上的token
  solToken: TokenData; // 部署在sol上的token
};

export type TokenData = {
  tokenAddress: string;
  poolAddress: string;
  symbol: string;
  name: string;
  marketCap: number;
  priceNative: string;
  priceUsd: string;
  volume: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  priceChange: {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
  };
  txns: {
    h24: {
      buys: number;
      sells: number;
    };
    h6: {
      buys: number;
      sells: number;
    };
    h1: {
      buys: number;
      sells: number;
    };
    m5: {
      buys: number;
      sells: number;
    };
  };
  nttConnect: {
    manager: string;
    transceiver: {
      address: string;
    };
  };
};

export enum SortBy {
  trending = "trending",
  owned = "owned",
  created = "created",
  newest = "newest",
  launching = "launching",
  marketCap = "marketCap",
}
