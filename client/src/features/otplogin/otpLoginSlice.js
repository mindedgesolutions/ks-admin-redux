import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../../../client-old/src/utils/customFetch";
import { toast } from "react-toastify";

const initialState = {
  newMobile: null,
  newOtp: null,
};

// export const generateOtp = createAsyncThunk(
//   "auth/generate-otp",
//   async (data) => {
//     try {
//       const response = await customFetch.post("/auth/generate-otp", data);
//       // initialState.newOtp = response.data.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

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
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(generateOtp.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(generateOtp.fulfilled, (state, action) => {
  //       console.log(action);
  //     })
  //     .addCase(generateOtp.rejected, (action) => {
  //       toast.error(action.payload);
  //     });
  // },
});

export const { changeMobile, generatedOtp } = otpLoginSlice.actions;
export default otpLoginSlice.reducer;
