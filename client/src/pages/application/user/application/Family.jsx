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
import { useNavigate } from "react-router-dom";
import { genders, relationships } from "../../../../utils/data";

// Loader starts ------
export const loader = async () => {
  try {
    const schemes = await customFetch.get("/master/schemes");
    const members = await customFetch.get("/applications/user/all-members");
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
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);

  const relationshipsList = relationships.filter(
    (relation) => relation.isActive === true
  );

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

  const resetForm = () =>
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
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
                <input type="hidden" name="appId" value={user.appId} />

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

      <ConfirmDeleteFamily />
    </>
  );
};

export default Family;
