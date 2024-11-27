import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Address, isAddress } from "viem";

type AppState = {
  referral: Address | undefined;
  searchTerms: string;
};

const appState: AppState = {
  referral: undefined,
  searchTerms: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState: appState,
  reducers: {
    setReferral: (state: AppState, action: PayloadAction<string>) => {
      if (isAddress(action.payload)) state.referral = action.payload;
    },
    setSearchTerms: (state: AppState, action: PayloadAction<string>) => {
      state.searchTerms = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;
export const { setReferral, setSearchTerms } = actions;
export const selectApp = (state: RootState) => state.app;
export default reducer;
