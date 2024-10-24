"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ApiRespCode, AsyncRequestStatus } from "@/services/types";
import { signIn } from "@/services/user/api";
import { UserData } from "@/services/user/types";

const setStorageAuthInfo = (token: string, user: UserData) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem("auth-token", token);
  localStorage.setItem("user", JSON.stringify(user));
};
const removeStorageAuthInfo = () => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem("auth-token");
  localStorage.removeItem("user");
};
const getStorageAuthInfo = () => {
  if (typeof window === "undefined") {
    return {};
  }
  const token = localStorage.getItem("auth-token");
  const user = localStorage.getItem("user");
  return {
    token,
    user: user ? JSON.parse(user) : undefined,
  };
};

type UserAuthState = {
  token?: string;
  user?: UserData;
  signInRequestStatus?: AsyncRequestStatus;
};

const userAuthState: UserAuthState = {
  ...(getStorageAuthInfo() as UserAuthState),
};

export const fetchSignIn = createAsyncThunk(
  "userAuth/signIn",
  async ({ address }: { address: string }) => {
    const resp = await signIn({ address });
    const { code, msg, data } = resp.data;
    if (code === ApiRespCode.SUCCESS) {
      return data;
    }
    throw new Error(msg);
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      const { userAuth } = state;
      const { user } = userAuth;
      if (user) {
        return false;
      }
      return true;
    },
  }
);

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: userAuthState,
  reducers: {
    signout: (state: UserAuthState) => {
      removeStorageAuthInfo();
      state.token = undefined;
      state.user = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSignIn.pending, (state) => {
        state.signInRequestStatus = AsyncRequestStatus.PENDING;
      })
      .addCase(fetchSignIn.fulfilled, (state, action) => {
        const { token, user } = action.payload;
        setStorageAuthInfo(token, user);
        state.token = token;
        state.user = user;
        state.signInRequestStatus = AsyncRequestStatus.FULFILLED;
      })
      .addCase(fetchSignIn.rejected, (state) => {
        state.signInRequestStatus = AsyncRequestStatus.REJECTED;
      });
  },
});

const { actions, reducer } = userAuthSlice;
export const { signout } = actions;
export const selectUserAuth = (state: RootState) => state.userAuth;
export default reducer;
