import request, { RequestPromise } from "../request";
import { ApiResp, ApiRespCode } from "../types";
import { MemeData, SortBy } from "./types";

export function getMemes(params: {
  pageSize?: number;
  pageNumber?: number;
  sortBy?: SortBy;
}): RequestPromise<ApiResp<Array<MemeData>>> {
  const { pageSize = 20, pageNumber = 1, sortBy } = params || {};
  // mock data
  const data = Array.from({ length: pageSize }).map((_, index) => {
    const address = (pageNumber - 1) * pageSize + index;
    return {
      address,
      name: "meme_" + address,
      image: "https://picsum.photos/325/400?random=" + address,
    };
  });

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          code: ApiRespCode.SUCCESS,
          data: data,
          msg: "success",
        },
      } as unknown as RequestPromise<ApiResp<Array<MemeData>>>);
    }, 2000);
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
