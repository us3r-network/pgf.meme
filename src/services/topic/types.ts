export type TopicData = {
  id: string;
  name: string;
  image: string;
  description: string;
  stats: TopicStats;
  tgGroupLink?: string; // tg群链接
};

export type TopicStats = {
  memesAmount: number;
};

export enum TopicSortBy {
  trending = "trending",
  owned = "owned",
  created = "created",
  newest = "newest",
  launching = "launching",
  marketCap = "marketCap",
}
