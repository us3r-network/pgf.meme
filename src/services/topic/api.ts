import { MemeData } from "../meme/types";
import request, { RequestPromise } from "../request";
import { ApiResp } from "../types";
import { TopicData, TopicSortBy } from "./types";

export function getTopics(params: {
  pageSize?: number;
  pageNumber?: number;
  sortBy?: TopicSortBy;
}): RequestPromise<ApiResp<Array<TopicData>>> {
  return request({
    url: `/memes/topics`,
    method: "get",
    params,
  });
}

export function getTopic({
  id,
}: {
  id: number;
}): RequestPromise<ApiResp<TopicData>> {
  return request({
    url: `/memes/topics/${id}`,
    method: "get",
  });
}

export type TrendingTopicData = {
  topic: TopicData;
  memes: MemeData[];
};
export function getTrendingTopics(params?: {
  pageSize?: number;
  pageNumber?: number;
}): RequestPromise<ApiResp<Array<TrendingTopicData>>> {
  return request({
    url: `/memes/topics/trending`,
    method: "get",
    params,
  });
}
