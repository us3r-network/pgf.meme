export type TopicData = {
  id: string;
  name: string;
  image: string;
  description: string;
  stats: TopicStats;
  tgLink: string;
};

export type TopicStats = {
  memesAmount: number;
};

export enum TopicSortBy {
  trending = "trending",
  newest = "newest",
  memes = "memes",
}
