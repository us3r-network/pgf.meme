import { getMeme } from "@/services/meme/api";
import { MemeData } from "@/services/meme/types";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { useRef, useState } from "react";

export default function useLoadMeme({ address }: { address: string }) {
  const [meme, setMeme] = useState<MemeData | null>(null);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const addressRef = useRef(address);

  const idle = status === AsyncRequestStatus.IDLE;
  const pending = status === AsyncRequestStatus.PENDING;

  const loadMeme = async () => {
    const address = addressRef.current;

    if (!address) {
      setMeme(null);
      return;
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const resp = await getMeme({
        address,
      });
      const { code, data, msg } = resp.data || {};
      if (code !== ApiRespCode.SUCCESS) {
        throw new Error(msg);
      }
      setMeme(data);
      setStatus(AsyncRequestStatus.FULFILLED);
    } catch (err) {
      console.error(err);
      setStatus(AsyncRequestStatus.REJECTED);
    }
  };

  return {
    idle,
    pending,
    meme,
    loadMeme,
  };
}
