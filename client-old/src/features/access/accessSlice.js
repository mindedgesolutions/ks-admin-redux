import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";
import {
  addAccessToLocalStorage,
  getAccessFromLocalStorage,
} from "../../utils/data";

// export const appAccess = createAsyncThunk("access", async (thunkAPI) => {
//   try {
//     const response = await customFetch.get(
//       "/applications/user/application-access"
//     );
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(error?.response?.data?.msg);
//   }
// });

const accessSlice = createSlice({
  name: "userAccess",
  initialState: {
    availableAccess: getAccessFromLocalStorage() || null,
    loading: false,
    error: null,
  },
  reducers: {
    updateAccess: (state, action) => {
      state.availableAccess = action.payload;
      addAccessToLocalStorage(action.payload);
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(appAccess.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(appAccess.fulfilled, (state, { payload }) => {
  //       const { data } = payload;
  //       state.loading = false;
  //       state.availableAccess = data;
  //       addAccessToLocalStorage(data);
  //     })
  //     .addCase(appAccess.rejected, (state) => {
  //       state.loading = false;
  //       toast.error(action.payload);
  //     });
  // },
});

export const { updateAccess } = accessSlice.actions;
export default accessSlice.reducer;
