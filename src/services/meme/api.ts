import { RequestPromise } from "../request";
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
    const id = (pageNumber - 1) * pageSize + index;
    return {
      id,
      name: "meme_" + id,
      image: "https://via.placeholder.com/325",
      createdAt: new Date().toISOString(),
      lastModifiedAt: new Date().toISOString(),
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
