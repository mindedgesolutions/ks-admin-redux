import { configureStore } from "@reduxjs/toolkit";
import accessReducer from "./features/access/accessSlice";

export const store = configureStore({
  reducer: {
    access: accessReducer,
  },
});
