import { configureStore } from "@reduxjs/toolkit";
import otpReducer from "./features/otplogin/otpLoginSlice";
import accessReducer from "./features/access/accessSlice";
import userBasicReducer from "./features/user/userBasicSlice";
import personalReducer from "./features/userApplication/personalSlice";
import subdivReducer from "./features/masters/subdivSlice";
import blockReducer from "./features/masters/blockSlice";
import gpReducer from "./features/masters/gpSlice";
import psReducer from "./features/masters/psSlice";
import bankNomineeReducer from "./features/userApplication/bankNomineesSlice";
import familyReducer from "./features/userApplication/familySlice";

export const store = configureStore({
  reducer: {
    otpLogin: otpReducer,
    access: accessReducer,
    user: userBasicReducer,
    personal: personalReducer,
    msubdivs: subdivReducer,
    mblocks: blockReducer,
    mgps: gpReducer,
    mps: psReducer,
    bankNominee: bankNomineeReducer,
    family: familyReducer,
  },
});
