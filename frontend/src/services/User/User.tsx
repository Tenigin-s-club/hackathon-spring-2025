import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "./types";

const initialState: User = {
  fio: "",
  role: ["admin"],
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state = action.payload;
    },
    logout: () => {
      return { ...initialState };
    },
  },
});

export const { setUserData, logout } = userSlice.actions;

export const { reducer: userReducer } = userSlice;
