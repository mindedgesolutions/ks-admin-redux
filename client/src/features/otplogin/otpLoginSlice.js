import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  newMobile: "",
  newOtp: "",
};

const otpLoginSlice = createSlice({
  name: "otpLogin",
  initialState: initialState,
  reducers: {
    changeMobile: (state) => {
      state.newMobile = null;
      state.newOtp = null;
    },
    generatedOtp: (state, action) => {
      state.newMobile = action.payload.mobile;
      state.newOtp = action.payload.otp;
    },
    resetOtpState: (state) => initialState,
  },
});

export const { changeMobile, generatedOtp, resetOtpState } =
  otpLoginSlice.actions;
export default otpLoginSlice.reducer;
