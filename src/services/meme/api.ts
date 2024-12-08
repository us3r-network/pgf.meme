import { Address } from "viem";
import { PGFToken } from "../contract/types";
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

export function getTopMemes(params: {
  chainId: "base" | "solana";
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

export async function launchMeme(data: {
  name: string;
  symbol: string;
  image?: string;
  description: string;
  topicId?: number;
  launcherEvmAddress: Address;
}): RequestPromise<ApiResp<MemeData>> {
  return request({
    url: `/memes/launch`,
    method: "post",
    data,
  });
}

export async function postMeme(
  token: PGFToken
): RequestPromise<ApiResp<MemeData>> {
  const imageUrl = await uploadImage(token.imageFile!);
  const data = { ...token, address: token.contractAddress, image: imageUrl };
  return request({
    url: `/memes/infos`,
    method: "post",
    data,
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

export async function uploadImage(file: File) {
  // console.log("uploadImage", file);
  const arweaveResp = await request({
    url: `/arweave/upload/image`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: { file },
  });
  return arweaveResp.data.data.arUrl as string;
}

export function validateBuyingMeme({
  tokenAddress,
  walletAddress,
}: {
  tokenAddress: string;
  walletAddress: string;
}): RequestPromise<ApiResp<boolean>> {
  return request({
    url: `/memes/${tokenAddress}/users/${walletAddress}/buying`,
    method: "get",
  });
}
