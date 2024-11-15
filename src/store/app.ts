import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Address,isAddress } from "viem";

type AppState = {
  referral: Address | undefined;
};

const appState: AppState = {
  referral: undefined,
};

export const appSlice = createSlice({
  name: "app",
  initialState: appState,
  reducers: {
    setReferral: (state: AppState, action: PayloadAction<string>) => {
      if (isAddress(action.payload))
      state.referral = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;
export const { setReferral } = actions;
export const selectApp = (state: RootState) => state.app;
export default reducer;
