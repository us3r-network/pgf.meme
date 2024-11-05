import { getTopics } from "@/services/topic/api";
import { TopicData, TopicSortBy } from "@/services/topic/types";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { uniqBy } from "lodash";
import { useRef, useState } from "react";

const PAGE_SIZE = 20;

export default function useLoadTopics(props?: { sortBy?: TopicSortBy }) {
  const [items, setItems] = useState<TopicData[]>([]);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const sortByRef = useRef(props?.sortBy);
  const pageInfoRef = useRef({
    hasNextPage: true,
    nextPageNumber: 1,
  });

  const loading = status === AsyncRequestStatus.PENDING;

  const loadItems = async () => {
    const sortBy = sortByRef.current;
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
      };
      const resp = await getTopics(params);
      const { code, data, msg } = resp.data || {};
      if (code !== ApiRespCode.SUCCESS) {
        throw new Error(msg);
      }
      setItems((pre) => uniqBy([...pre, ...data], "id"));
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
