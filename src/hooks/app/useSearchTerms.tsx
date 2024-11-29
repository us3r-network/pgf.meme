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
    debounce((terms: string) => {
      dispatch(setSearchTermsToStore(terms));
    }, 500),
    [dispatch]
  );

  return {
    searchTerms,
    setSearchTerms,
  };
}
