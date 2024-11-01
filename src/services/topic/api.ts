import request, { RequestPromise } from "../request";
import { ApiResp } from "../types";
import { TopicData, TopicSortBy } from "./types";

export function getTopics(params: {
  pageSize?: number;
  pageNumber?: number;
  sortBy?: TopicSortBy;
}): RequestPromise<ApiResp<Array<TopicData>>> {
  return request({
    url: `/topics`,
    method: "get",
    params,
  });
}

export function getTopic({
  id,
}: {
  id: string;
}): RequestPromise<ApiResp<TopicData>> {
  return request({
    url: `/topics/${id}`,
    method: "get",
  });
}

export function getTopicsBanner(): RequestPromise<ApiResp<TopicData[]>> {
  return request({
    url: `/topics/banner`,
    method: "get",
  });
}
