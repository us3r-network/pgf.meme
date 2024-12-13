import { API_BASE_URL } from "@/constants";
import { getMemeApiPath } from "@/services/meme/api";
import { MemeData } from "@/services/meme/types";
import { fetcher } from "@/services/swr";
import { ApiResp } from "@/services/types";
import useSWR from "swr";

export default function useLoadMeme({ address }: { address: string }) {
  const url = API_BASE_URL + getMemeApiPath(address);
  const {
    data: res,
    error,
    isLoading,
  } = useSWR<ApiResp<MemeData>>(url, fetcher);
  const { data, code, msg } = res || {};

  return {
    pending: isLoading,
    meme: data,
  };
}
