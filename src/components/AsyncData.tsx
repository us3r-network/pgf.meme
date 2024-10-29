"use client";

import useReferral from "@/hooks/app/useReferral";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function AsyncDataSuspense() {
  const searchParams = useSearchParams();

  const { setReferral } = useReferral();

  useEffect(() => {
    if (searchParams.get("referral")) {
      setReferral(searchParams.get("referral") as string);
    }
  }, [searchParams]);
  return <></>;
}

export default function AsyncData() {
  return (
    <Suspense>
      <AsyncDataSuspense />
    </Suspense>
  );
}
