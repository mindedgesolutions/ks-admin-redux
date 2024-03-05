import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/customFetch";

// export const getEditDetails = createAsyncThunk(
//   "/family/details",
//   async (data) => {
//     try {
//       const response = await customFetch.get(
//         `/applications/user/single-member/${data}`
//       );
//       return response.data.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const initialState = {
  visible: false,
  visibleF: false,
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
  allFSchemes: [],
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
    showFamilyModal: (state) => {
      state.visibleF = true;
    },
    hideFamilyModal: (state) => {
      state.visibleF = false;
      state.fMember = {
        id: 0,
        application_id: 0,
        member_name: "",
        member_gender: "",
        member_age: 0,
        member_aadhar_no: "",
        member_relationship: "",
        member_epic: "",
        member_schemes: [],
      };
    },
    clearSchemes: (state) => {
      state.clearData = state.clearData + 1;
      state.fMember = {
        id: 0,
        application_id: 0,
        member_name: "",
        member_gender: "",
        member_age: 0,
        member_aadhar_no: "",
        member_relationship: "",
        member_epic: "",
        member_schemes: [],
      };
    },
    familySchemeSet: (state, action) => {
      const sendSchemes = JSON.stringify(action.payload);
      state.fSchemes = sendSchemes;
    },
    currentMembers: (state, action) => {
      state.fMembers = action.payload.data.rows;
      state.allFSchemes = action.payload.meta.rows;
    },
    addMember: (state, action) => {
      state.fMembers = [...state.fMembers, action.payload];
    },
    memberInfo: (state, action) => {
      state.fMember = {
        id: Number(action.payload.id),
        application_id: Number(action.payload.application_id),
        member_name: action.payload.member_name,
        member_gender: action.payload.member_gender,
        member_age: Number(action.payload.member_age),
        member_aadhar_no: action.payload.member_aadhar_no,
        member_relationship: action.payload.member_relationship,
        member_epic: action.payload.member_epic,
        member_schemes: action.payload.schemes_array,
      };
    },
    editMember: (state, action) => {
      const { id } = action.payload;
      state.fMembers = state.fMembers.filter(
        (i) => Number(i.id) !== Number(id)
      );
      state.fMembers = [...state.fMembers, action.payload];
    },
    deleteMember: (state, action) => {
      const deleteId = action.payload;
      state.fMembers = state.fMembers.filter(
        (value) => Number(deleteId) !== Number(value.id)
      );
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getEditDetails.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(getEditDetails.fulfilled, (state, action) => {
  //       const data = action.payload.data.rows[0];
  //       const schemes = action.payload.meta.rows;
  //       state.fMember = {
  //         id: Number(data.id),
  //         application_id: Number(data.application_id),
  //         member_name: data.member_name,
  //         member_gender: data.member_gender,
  //         member_age: Number(data.member_age),
  //         member_aadhar_no: data.member_aadhar_no,
  //         member_relationship: data.member_relationship,
  //         member_epic: data.member_epic,
  //         member_schemes: schemes,
  //       };
  //       state.fSchemes = JSON.stringify(schemes);
  //     })
  //     .addCase(getEditDetails.rejected, (state, action) => {
  //       state.isLoading = false;
  //       console.log(action.payload);
  //     });
  // },
});

export const {
  showModal,
  hideModal,
  showFamilyModal,
  hideFamilyModal,
  familySchemeSet,
  clearSchemes,
  currentMembers,
  addMember,
  editMember,
  deleteMember,
  memberInfo,
} = familySlice.actions;
export default familySlice.reducer;
