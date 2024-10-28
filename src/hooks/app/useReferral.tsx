"use client";

import { setReferral as setReferralToStore, selectApp } from "@/store/app";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function useReferral() {
  const dispatch = useAppDispatch();
  const { referral } = useAppSelector(selectApp);

  const setReferral = useCallback(
    (referral: string) => {
      dispatch(setReferralToStore(referral));
    },
    [dispatch]
  );

  return {
    referral,
    setReferral,
  };
}
