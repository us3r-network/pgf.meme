import { getMeme, launchMeme, uploadImage } from "@/services/meme/api";
import { MemeData } from "@/services/meme/types";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { useCallback, useRef, useState } from "react";
import { useAccount } from "wagmi";

export default function useLaunchMeme(opts?: {
  onLaunchSuccess?: (meme: MemeData) => void;
  onLaunchFail?: (msg: string) => void;
}) {
  const { address } = useAccount();
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const statusRef = useRef(status);

  const pending = status === AsyncRequestStatus.PENDING;

  const launchMemeAction = useCallback(
    async (
      info: {
        name: string;
        symbol: string;
        imageUrl?: string;
        imageFile?: File;
        description: string;
        topicId?: number;
      },
      callback: {
        onLaunchSuccess?: (meme: MemeData) => void;
        onLaunchFail?: (msg: string) => void;
      }
    ) => {
      if (!address) {
        return;
      }
      if (statusRef.current === AsyncRequestStatus.PENDING) {
        return;
      }
      setStatus(AsyncRequestStatus.PENDING);
      statusRef.current = AsyncRequestStatus.PENDING;
      try {
        let imageUrl = info?.imageUrl || "";
        if (!imageUrl && info.imageFile) {
          imageUrl = await uploadImage(info.imageFile);
          delete info.imageFile;
        }
        const resp = await launchMeme({
          ...info,
          imageUrl,
          launcherEvmAddress: address,
        });
        const { code, data, msg } = resp.data || {};
        if (code !== ApiRespCode.SUCCESS) {
          throw new Error(msg);
        }
        opts?.onLaunchSuccess?.(data);
        callback.onLaunchSuccess?.(data);
        setStatus(AsyncRequestStatus.FULFILLED);
        statusRef.current = AsyncRequestStatus.FULFILLED;
      } catch (err: any) {
        console.error(err);
        const msg = err?.message || "Failed to launch meme";
        opts?.onLaunchFail?.(msg);
        callback.onLaunchFail?.(msg);
        setStatus(AsyncRequestStatus.REJECTED);
        statusRef.current = AsyncRequestStatus.REJECTED;
      }
    },
    [address]
  );

  return {
    pending,
    launchMeme: launchMemeAction,
  };
}
