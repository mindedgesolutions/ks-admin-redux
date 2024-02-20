import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./features/otplogin/otpLoginSlice";

export const store = configureStore({
  reducer: {
    otpLogin: otpReducer,
  },
});
