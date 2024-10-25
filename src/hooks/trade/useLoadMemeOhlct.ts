import { getMemeOhlct } from "@/services/trade/api";
import { OhlctData } from "@/services/trade/types";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { useRef, useState } from "react";

export default function useLoadMemeOhlct({ address }: { address: string }) {
  const [ohlct, setOhlct] = useState<OhlctData[]>([]);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const addressRef = useRef(address);

  const idle = status === AsyncRequestStatus.IDLE;
  const pending = status === AsyncRequestStatus.PENDING;

  const loadMemeOhlct = async () => {
    const address = addressRef.current;

    if (!address) {
      setOhlct([]);
      return;
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const resp = await getMemeOhlct({
        address,
      });
      const { code, data, msg } = resp.data || {};
      if (code !== ApiRespCode.SUCCESS) {
        throw new Error(msg);
      }
      setOhlct(data);
      setStatus(AsyncRequestStatus.FULFILLED);
    } catch (err) {
      console.error(err);
      setStatus(AsyncRequestStatus.REJECTED);
    }
  };

  return {
    idle,
    pending,
    ohlct,
    loadMemeOhlct,
  };
}
