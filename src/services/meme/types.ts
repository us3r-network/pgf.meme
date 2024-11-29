import { Address } from "viem";
import type { TopicData } from "../topic/types";
import { NeynarCast } from "../neynar";

export type MemeData = {
  // Meme 基本信息
  address: Address;
  symbol: string;
  name: string;
  image: string;
  description: string;
  createdBy: MemeCreatedBy;
  createdAt: number;
  tgPostLink?: string; // tg channel post link
  topic?: TopicData;

  // Meme 关联信息
  // cast?: NeynarCast;
  castHash?: string;
  requestorFid?: string;

  baseToken: TokenData;
  solToken: TokenData;
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
};

export type MemeCreatedBy = {
  walletAddress: string;
  name?: string;
  avatar?: string;
};

export enum SortBy {
  trending = "trending",
  owned = "owned",
  created = "created",
  newest = "newest",
  launching = "launching",
  marketCap = "marketCap",
}
