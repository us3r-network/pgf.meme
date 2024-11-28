import { getTopMemes } from "@/services/meme/api";
import { MemeData } from "@/services/meme/types";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { useRef, useState } from "react";

export default function useTopMemes(props?: {}) {
  const [items, setItems] = useState<MemeData[]>([]);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);

  const loading = status === AsyncRequestStatus.PENDING;

  const loadItems = async (chainId: "base" | "solana") => {
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const resp = await getTopMemes({ chainId });
      const { code, data, msg } = resp.data || {};
      if (code !== ApiRespCode.SUCCESS) {
        throw new Error(msg);
      }
      setItems(data);
      setStatus(AsyncRequestStatus.FULFILLED);
    } catch (err) {
      console.error(err);
      setStatus(AsyncRequestStatus.REJECTED);
    }
  };

  return {
    loading,
    items,
    loadItems,
  };
}
