import { Address } from "viem";
import type { TopicData } from "../topic/types";

export type MemeData = {
  address: Address;
  symbol: string;
  name: string;
  image: string;
  description: string;
  createdBy: MemeCreatedBy;
  progress: number;
  stats: MemeStats;
  tgGroupLink?: string; // tg群链接
  tgPostLink?: string; // tg channel post link
  graduation?: MemeGraduation;
  topic?: TopicData;
};

export type MemeGraduation = {
  tokenAddress: string;
  poolAddress: string;
};
export type MemeCreatedBy = {
  walletAddress: string;
  name?: string;
  avatar?: string;
};
export type MemeStats = {
  marketCap: number;
  availableAmount: number;
  bondingCurveEth: number;
  buyersNumber: number;
};

export enum SortBy {
  trending = "trending",
  owned = "owned",
  created = "created",
  newest = "newest",
  launching = "launching",
  marketCap = "marketCap",
}
