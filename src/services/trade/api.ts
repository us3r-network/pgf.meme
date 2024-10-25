import request, { RequestPromise } from "../request";
import { ApiResp } from "../types";
import { OhlctData, TradeData } from "./types";

export function getMemeTrades({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<TradeData[]>> {
  return request({
    url: `/memes/${address}/trades`,
    method: "get",
  });
}

export function getMemeOhlct({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<OhlctData[]>> {
  return request({
    url: `/memes/${address}/ohlct`,
    method: "get",
  });
}
