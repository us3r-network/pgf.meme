import axios from "axios";
import request, { RequestPromise } from "../request";
import { ApiResp } from "../types";
import { EnsProfile, OwnedMemeData, UserData } from "./types";

export function signIn(params: { address: string }): RequestPromise<
  ApiResp<{
    token: string;
    user: UserData;
  }>
> {
  const { address } = params;
  return request({
    url: `signin`,
    method: "post",
    params: {
      address,
    },
  });
}

export function getOwnedMemes({
  address,
}: {
  address: string;
}): RequestPromise<ApiResp<OwnedMemeData[]>> {
  return request({
    url: `/users/${address}/owned`,
    method: "get",
  });
}

export function getEnsProfile({
  address,
}: {
  address: string;
}): RequestPromise<EnsProfile> {
  return axios.get(`https://api.web3.bio/profile/ens/${address}`);
}
