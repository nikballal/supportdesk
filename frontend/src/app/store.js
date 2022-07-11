import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

//bring in the reducers from authSlice

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
