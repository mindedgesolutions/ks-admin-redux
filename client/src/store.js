import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./features/otplogin/otpLoginSlice";
import accessReducer from "./features/access/accessSlice";
import userDetailsReducer from "./features/user/userDetailsSlice";
import districtReducer from "./features/masters/districtMasterSlice";
import subDivReducer from "./features/masters/subdivMasterSlice";

export const store = configureStore({
  reducer: {
    otpLogin: otpReducer,
    access: accessReducer,
    userDetails: userDetailsReducer,
    districts: districtReducer,
    subdivs: subDivReducer,
  },
});
