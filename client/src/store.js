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
import overViewReducer from "./features/userApplication/overViewSlice";
import statesReducer from "./features/masters/statesSlice";
import jobsReducer from "./features/masters/jobsSlice";
import countryReducer from "./features/masters/countrySlice";
import schemeReducer from "./features/masters/schemeSlice";
import bankReducer from "./features/masters/bankSlice";
import adminLoginReducer from "./features/adminLogin/adminLoginSlice";
import adminBasicReducer from "./features/admin/adminBasicSlice";

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
    overview: overViewReducer,
    states: statesReducer,
    jobs: jobsReducer,
    countries: countryReducer,
    schemes: schemeReducer,
    banks: bankReducer,
    adminLogin: adminLoginReducer,
    adminBasic: adminBasicReducer,
  },
});
