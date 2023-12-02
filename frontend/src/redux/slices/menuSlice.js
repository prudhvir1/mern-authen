import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const menuSlice = createSlice({
  name: "util",
  initialState,
  reducers: {
    isLogin: (state, action) => {
      state.isLogin = action.payload;
    },
  },
});

export const { isLogin } = menuSlice.actions;

export default menuSlice.reducer;
