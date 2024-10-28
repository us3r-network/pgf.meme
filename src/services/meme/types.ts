export type MemeData = {
  address: string;
  symbol: string;
  name: string;
  image: string;
  description: string;
  createdBy: MemeCreatedBy;
  progress: number;
  stats: MemeStats;
  tgGroupLink?: string; // tg群链接
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
