import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type AppState = {
  referral: string;
};

const appState: AppState = {
  referral: "",
};

export const appSlice = createSlice({
  name: "app",
  initialState: appState,
  reducers: {
    setReferral: (state: AppState, action: PayloadAction<string>) => {
      state.referral = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;
export const { setReferral } = actions;
export const selectApp = (state: RootState) => state.app;
export default reducer;
