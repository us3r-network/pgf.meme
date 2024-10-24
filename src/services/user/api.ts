import request, { RequestPromise } from "../request";
import { ApiResp } from "../types";
import { UserData } from "./types";

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
