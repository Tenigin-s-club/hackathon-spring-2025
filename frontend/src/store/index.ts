import { configureStore } from "@reduxjs/toolkit";
import { uiReducer, uiStoreName } from "./ui";

export const store = configureStore({
  reducer: {
    [uiStoreName]: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
