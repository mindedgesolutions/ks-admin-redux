import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobs: [],
  isLoading: false,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState: initialState,
  reducers: {
    setJobList: (state, action) => {
      state.jobs = action.payload;
    },
  },
});

export const { setJobList } = jobsSlice.actions;
export default jobsSlice.reducer;
