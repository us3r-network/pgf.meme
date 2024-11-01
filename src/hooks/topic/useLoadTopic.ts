import { getTopic } from "@/services/topic/api";
import { TopicData } from "@/services/topic/types";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { useRef, useState } from "react";

export default function useLoadTopic({ id }: { id: string }) {
  const [topic, setTopic] = useState<TopicData | null>(null);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const idRef = useRef(id);

  const idle = status === AsyncRequestStatus.IDLE;
  const pending = status === AsyncRequestStatus.PENDING;

  const loadTopic = async () => {
    const id = idRef.current;

    if (!id) {
      setTopic(null);
      return;
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const resp = await getTopic({
        id,
      });
      const { code, data, msg } = resp.data || {};
      if (code !== ApiRespCode.SUCCESS) {
        throw new Error(msg);
      }
      setTopic(data);
      setStatus(AsyncRequestStatus.FULFILLED);
    } catch (err) {
      console.error(err);
      setStatus(AsyncRequestStatus.REJECTED);
    }
  };

  return {
    idle,
    pending,
    topic,
    loadTopic,
  };
}
