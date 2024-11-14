import { validateBuyingMeme } from "@/services/meme/api";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { useCallback, useRef, useState } from "react";
import { useAccount } from "wagmi";

export default function useValidateBuyingMeme({
  address,
}: {
  address: string;
}) {
  const { address: walletAddress } = useAccount();
  const [valid, setValid] = useState<boolean>(false);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const addressRef = useRef(address);

  const idle = status === AsyncRequestStatus.IDLE;
  const pending = status === AsyncRequestStatus.PENDING;

  const validate = useCallback(async () => {
    const address = addressRef.current;

    if (!address || !walletAddress) {
      return;
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const resp = await validateBuyingMeme({
        tokenAddress: address,
        walletAddress: walletAddress,
      });
      const { code, data, msg } = resp.data || {};
      if (code !== ApiRespCode.SUCCESS) {
        throw new Error(msg);
      }
      setValid(data === true);
      setStatus(AsyncRequestStatus.FULFILLED);
    } catch (err) {
      console.error(err);
      setStatus(AsyncRequestStatus.REJECTED);
    }
  }, [walletAddress]);

  return {
    idle,
    pending,
    valid,
    validate,
  };
}
