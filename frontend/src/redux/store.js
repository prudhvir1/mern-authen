import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/authSlice.js";
import { apiSlice } from "./slices/apiSlice.js";
import menuReducer from "./slices/menuSlice.js";
export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
