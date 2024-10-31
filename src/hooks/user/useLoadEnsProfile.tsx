import { AsyncRequestStatus } from "@/services/types";
import { getEnsProfile } from "@/services/user/api";
import { EnsProfile } from "@/services/user/types";
import { useRef, useState } from "react";

export default function useLoadEnsProfile({ address }: { address: string }) {
  const [ensProfile, setEnsProfile] = useState<EnsProfile | null>(null);
  const [status, setStatus] = useState(AsyncRequestStatus.IDLE);
  const addressRef = useRef(address);

  const idle = status === AsyncRequestStatus.IDLE;
  const pending = status === AsyncRequestStatus.PENDING;

  const loadEnsProfile = async () => {
    const address = addressRef.current;

    if (!address) {
      setEnsProfile(null);
      return;
    }
    setStatus(AsyncRequestStatus.PENDING);
    try {
      const resp = await getEnsProfile({
        address,
      });
      const profiles = resp?.data || [];
      const findAvatarProfile = profiles.find((p) => !!p.avatar);
      const profile = findAvatarProfile || profiles[0];
      setEnsProfile(profile);
      setStatus(AsyncRequestStatus.FULFILLED);
    } catch (err) {
      console.error(err);
      setStatus(AsyncRequestStatus.REJECTED);
    }
  };

  return {
    idle,
    pending,
    ensProfile,
    loadEnsProfile,
  };
}
