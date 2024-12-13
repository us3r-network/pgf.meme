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

export const getMemeApiPath = (address: string) => {
  let url = "";
  // EVM链地址：以0x开头，长度42，包含0-9和a-f
  const evmRegex = /^0x[a-fA-F0-9]{40}$/;

  // Solana链地址：Base58编码，长度在32到44之间
  const solanaRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;

  if (evmRegex.test(address)) {
    url = `/memes/one?evmAddress=${address}`;
  } else if (solanaRegex.test(address)) {
    url = `/memes/one?solanaAddress=${address}`;
  } else {
    url = `/memes/${address}`;
  }
  return url;
};
export function getMeme({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<MemeData>> {
  const url = getMemeApiPath(address);
  return request({
    url,
    method: "get",
  });
}

export async function launchMeme(data: {
  name: string;
  symbol: string;
  imageUrl?: string;
  description: string;
  topicId?: number;
  launcherEvmAddress: Address;
}): RequestPromise<ApiResp<MemeData>> {
  return request({
    url: `/memes`,
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
