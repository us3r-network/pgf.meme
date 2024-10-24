"use client";

import { configureStore } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import userAuthSlice from "./user/userAuthSlice";

enableMapSet();

export const store = configureStore({
  reducer: {
    userAuth: userAuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
