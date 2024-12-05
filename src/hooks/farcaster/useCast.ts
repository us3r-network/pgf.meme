import { NeynarCast } from "@/services/neynar";
import { fetcher } from "@/services/swr";
import useSWR from "swr";
export default function useCast(hash: string) {
  const { data, error, isLoading } = useSWR<{ cast: NeynarCast }>(
    `/neynar-api/cast?hash=${hash}`,
    fetcher
  );

  return {
    cast: data?.cast,
    isLoading,
    isError: error,
  };
}
