import request, { RequestPromise } from "../request";
import { ApiResp } from "../types";
import { UserLeaderboardData } from "../user/types";
import { MemeData, SortBy } from "./types";

export function getMemes(params: {
  pageSize?: number;
  pageNumber?: number;
  sortBy?: SortBy;
}): RequestPromise<ApiResp<Array<MemeData>>> {
  return request({
    url: `/memes`,
    method: "get",
    params,
  });
}

export function getMeme({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<MemeData>> {
  return request({
    url: `/memes/${address}`,
    method: "get",
  });
}

export function getMemeLeaderboard({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<UserLeaderboardData[]>> {
  return request({
    url: `/memes/${address}/leaderboard`,
    method: "get",
  });
}
