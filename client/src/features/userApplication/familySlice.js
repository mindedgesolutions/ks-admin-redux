import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

export const getEditDetails = createAsyncThunk(
  "/family/details",
  async (data) => {
    try {
      const response = await customFetch.get(
        `/applications/user/single-member/${data}`
      );
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  visible: false,
  fMember: {
    id: 0,
    application_id: 0,
    member_name: "",
    member_gender: "",
    member_age: 0,
    member_aadhar_no: "",
    member_relationship: "",
    member_epic: "",
    member_schemes: [],
  },
  fMembers: [],
  fSchemes: [],
  clearData: 0,
  isLoading: false,
};

const familySlice = createSlice({
  name: "family",
  initialState: initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.fMember.id = action.payload.id;
      state.fMember.member_name = action.payload.name;
    },
    hideModal: (state) => {
      state.visible = false;
      state.fMember = { id: 0, member_name: "" };
    },
    clearSchemes: (state) => {
      state.clearData = state.clearData + 1;
    },
    familySchemeSet: (state, action) => {
      const sendSchemes = JSON.stringify(action.payload);
      state.fSchemes = sendSchemes;
    },
    currentMembers: (state, action) => {
      state.fMembers = action.payload;
    },
    addMember: (state, action) => {
      state.fMembers = [...state.fMembers, action.payload];
    },
    deleteMember: (state, action) => {
      const deleteId = action.payload;
      state.fMembers = state.fMembers.filter((value) => deleteId !== value.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEditDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getEditDetails.fulfilled, (state, action) => {
        const data = action.payload.data.rows[0];
        const schemes = action.payload.meta.rows;
        state.fMember = {
          id: Number(data.id),
          application_id: Number(data.application_id),
          member_name: data.member_name,
          member_gender: data.member_gender,
          member_age: Number(data.member_age),
          member_aadhar_no: data.member_aadhar_no,
          member_relationship: data.member_relationship,
          member_epic: data.member_epic,
          member_schemes: schemes,
        };
        state.fSchemes = schemes;
      })
      .addCase(getEditDetails.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});

export const {
  showModal,
  hideModal,
  familySchemeSet,
  clearSchemes,
  currentMembers,
  addMember,
  deleteMember,
} = familySlice.actions;
export default familySlice.reducer;
