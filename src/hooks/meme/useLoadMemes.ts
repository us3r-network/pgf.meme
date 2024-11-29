import { getMemes } from "@/services/meme/api";
import { MemeData, SortBy } from "@/services/meme/types";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { useRef, useState } from "react";

const PAGE_SIZE = 20;

export default function useLoadMemes(props?: {
  sortBy?: SortBy;
  topicId?: number;
  query?: string;
}) {
  const [items, setItems] = useState<MemeData[]>([]);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const sortByRef = useRef(props?.sortBy);
  const topicIdRef = useRef(props?.topicId);
  const queryRef = useRef(props?.query);
  const pageInfoRef = useRef({
    hasNextPage: true,
    nextPageNumber: 1,
  });

  const loading = status === AsyncRequestStatus.PENDING;

  const loadItems = async (isQueryChange?: boolean) => {
    const sortBy = sortByRef.current;
    const topicId = topicIdRef.current;
    const query = queryRef.current;
    if (isQueryChange) {
      pageInfoRef.current = {
        hasNextPage: true,
        nextPageNumber: 1,
      };
      setItems([]);
    }
    const { hasNextPage, nextPageNumber } = pageInfoRef.current;

    if (hasNextPage === false) {
      return;
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const params = {
        pageSize: PAGE_SIZE,
        pageNumber: nextPageNumber,
        ...(sortBy ? { sortBy } : {}),
        ...(topicId ? { topicId } : {}),
        query: query || "",
      };
      const resp = await getMemes(params);
      const { code, data, msg } = resp.data || {};
      if (code !== ApiRespCode.SUCCESS) {
        throw new Error(msg);
      }
      setItems((pre) => [...pre, ...data]);
      pageInfoRef.current = {
        hasNextPage: data.length === PAGE_SIZE,
        nextPageNumber: nextPageNumber + 1,
      };
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
