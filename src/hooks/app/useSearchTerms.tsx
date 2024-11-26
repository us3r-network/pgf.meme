"use client";

import {
  setSearchTerms as setSearchTermsToStore,
  selectApp,
} from "@/store/app";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { debounce } from "lodash";

export default function useSearchTerms() {
  const dispatch = useAppDispatch();
  const { searchTerms } = useAppSelector(selectApp);

  const setSearchTerms = useCallback(
    (str: string) => {
      debounce(() => {
        dispatch(setSearchTermsToStore(str));
      }, 500);
    },
    [dispatch]
  );

  return {
    searchTerms,
    setSearchTerms,
  };
}
