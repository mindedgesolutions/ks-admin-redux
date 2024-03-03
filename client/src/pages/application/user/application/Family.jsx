import React, { useState } from "react";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import {
  ApplicationMenu,
  ConfirmDeleteFamily,
  InputRadio,
  InputSelect,
  InputText,
  SubmitBtn,
  UserFamilySchemes,
  UserFamilyTable,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { genders, relationships } from "../../../../utils/data";
import { toast } from "react-toastify";
import {
  addMember,
  currentMembers,
  deleteMember,
  hideModal,
} from "../../../../features/userApplication/familySlice";
import { access, accessRevoke } from "../../../../features/user/userBasicSlice";

// Loader starts ------
export const loader = (store) => async () => {
  try {
    const schemes = await customFetch.get("/master/schemes");
    const members = await customFetch.get(
      "/applications/user/all-members-partial"
    );
    store.dispatch(currentMembers(members.data.data.rows));
    return { schemes, members };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const Family = () => {
  document.title = `Family Information | ${import.meta.env.VITE_USER_TITLE}`;
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { fSchemes, fMember, fMembers } = useSelector((store) => store.family);

  const relationshipsList = relationships.filter(
    (relation) => relation.isActive === true
  );

  // Form input state management starts ------
  const [form, setForm] = useState({
    memberName: "",
    memberGender: "",
    memberAge: "",
    memberRelation: "",
    memberAadhaar: "",
    memberEpic: "",
    isLoading: false,
    btnLabel: "Add member",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Reset form inputs starts ------
  const resetForm = () => {
    setForm({
      ...form,
      memberName: "",
      memberGender: "",
      memberAge: "",
      memberRelation: "",
      memberAadhaar: "",
      memberEpic: "",
      isLoading: false,
      btnLabel: "Add member",
    });
  };

  // Handle add member form submit starts ------
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, isLoading: true });
    const formData = new FormData(e.currentTarget);
    let inputValues = Object.fromEntries(formData);
    inputValues = { ...inputValues, memberSchemes: fSchemes };

    const process =
      inputValues.editId > 0 ? customFetch.patch : customFetch.post;
    const url =
      inputValues.editId > 0
        ? `/applications/user/update-member/${inputValues.appId}/${inputValues.editId}`
        : `/applications/user/add-member`;
    const msg = inputValues.editId > 0 ? `Information updated` : `Member added`;

    try {
      const response = await process(url, inputValues);
      const newMember = {
        id: response.data.data.rows[0].id,
        application_id: Number(inputValues.appId),
        member_name: inputValues.memberName,
        member_gender: inputValues.memberGender,
        member_age: Number(inputValues.memberAge),
        member_aadhar_no: inputValues.memberAadhaar,
        member_relationship: inputValues.memberRelation,
        member_epic: inputValues.memberEpic,
        member_schemes: fSchemes,
      };

      dispatch(addMember(newMember));
      dispatch(access("doc"));

      toast.success(msg);
      resetForm();
    } catch (error) {
      setForm({ ...form, isLoading: false });
      splitErrors(error?.response?.data?.msg);
      return error;
    }
  };

  // Edit member starts ------

  // Delete family member ------
  const deleteConfirmed = async () => {
    const response = await customFetch.delete(
      `/applications/user/delete/${user.id}/${fMember.id}`
    );

    dispatch(deleteMember(fMember.id));
    dispatch(hideModal());

    if (response?.data?.data?.rows[0]?.count == 0) {
      dispatch(accessRevoke("doc"));
      return;
    }
    dispatch(access("doc"));

    toast.success(`Member deleted successfully`);
    resetForm();
  };

  return (
    <>
      <UserPageHeader title="Family Related Information" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <ApplicationMenu />

            <div className="col d-flex flex-column">
              <form onSubmit={handleFormSubmit} autoComplete="off">
                <input type="hidden" name="appId" value={user.id} />
                <input type="hidden" name="editId" value={fMember.id} />

                <div className="card-body">
                  <div className="row row-cards">
                    <div className="col-md-6 col-sm-12">
                      <InputText
                        label="Family member name"
                        name="memberName"
                        required={true}
                        value={form.memberName}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <InputRadio
                        label="Gender"
                        name="memberGender"
                        required={true}
                        options={genders}
                        value={form.memberGender}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <InputText
                        label="Age"
                        name="memberAge"
                        required={true}
                        value={form.memberAge}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <InputSelect
                        label="Relationship"
                        name="memberRelation"
                        placeholder="relationship"
                        options={relationshipsList}
                        required={true}
                        value={form.memberRelation}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <InputText
                        label="Aadhaar no."
                        name="memberAadhaar"
                        required={true}
                        value={form.memberAadhaar}
                        handleChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <InputText
                        label="EPIC no."
                        name="memberEpic"
                        required={Number(form.memberAge) >= 18}
                        value={form.memberEpic}
                        handleChange={handleChange}
                      />
                    </div>
                    <UserFamilySchemes />
                  </div>
                  <div className="mt-5">
                    <SubmitBtn
                      text={form.btnLabel}
                      isLoading={form.isLoading}
                    />
                    <button
                      type="button"
                      className="btn btn-default ms-2"
                      onClick={resetForm}
                    >
                      Reset form
                    </button>
                  </div>
                </div>
              </form>

              <div className="card-body px-2">
                <UserFamilyTable />
              </div>
            </div>
          </div>
        </div>
      </UserPageWrapper>

      <ConfirmDeleteFamily deleteConfirmed={deleteConfirmed} />
    </>
  );
};

export default Family;
