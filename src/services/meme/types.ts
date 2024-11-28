import { Address } from "viem";
import type { TopicData } from "../topic/types";
import { NeynarCast } from "../neynar";

export type MemeData = {
  address: Address;
  symbol: string;
  name: string;
  image: string;
  description: string;
  createdBy: MemeCreatedBy;
  created_at: Date;
  tgPostLink?: string; // tg channel post link
  topic?: TopicData;

  // cast?: NeynarCast;
  castHash?: string;
  baseToken: TokenData;
  solToken: TokenData;
};

export type TokenData = {
  tokenAddress: string;
  poolAddress: string;
  symbol: string;
  name: string;
  decimals: number;
  marketCap: number;
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
