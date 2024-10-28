"use client";

import useReferral from "@/hooks/app/useReferral";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AsyncData() {
  const searchParams = useSearchParams();

  const { setReferral } = useReferral();

  useEffect(() => {
    if (searchParams.get("referral")) {
      setReferral(searchParams.get("referral") as string);
    }
  }, [searchParams]);
  return <></>;
}
