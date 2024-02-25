import React, { useEffect, useState } from "react";
import {
  ApplicationMenu,
  UserPageHeader,
  UserPageWrapper,
  InputText,
  MasterDistricts,
  MasterSubDivs,
} from "../../../../components";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import { useLoaderData } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeDist } from "../../../../features/masters/districtMasterSlice";
import {
  changeSubdiv,
  getSubdivs,
} from "../../../../features/masters/subdivMasterSlice";

// Loader starts ------
export const loader = async () => {
  try {
    const personalInfo = await customFetch.get(
      "/applications/user/personal-info"
    );
    return personalInfo;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const PersonalInfo = () => {
  document.title = `Personal Information | ${import.meta.env.VITE_USER_TITLE}`;
  const personalInfo = useLoaderData();
  const dispatch = useDispatch();
  const dbDist = personalInfo?.data?.data?.rows[0]?.permanent_dist || "";
  const dbSubdiv =
    personalInfo?.data?.data?.rows[0]?.permanent_subdivision || "";

  // Input fields state management starts ------
  const [form, setForm] = useState({
    name: personalInfo?.data?.data?.rows[0]?.name || "",
    fatherHusbandName:
      personalInfo?.data?.data?.rows[0]?.father_husband_name || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // Input fields state management ends ------

  // Keep related dropdowns selected starts ------
  useEffect(() => {
    dispatch(changeDist(dbDist));
    dispatch(getSubdivs(dbDist));
    dispatch(changeSubdiv(dbSubdiv));
  }, []);
  // Keep related dropdowns selected ends ------

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <UserPageHeader title="Personal Information" />
      <UserPageWrapper>
        <div className="card pe-0">
          <div className="row g-0">
            <ApplicationMenu />
            <div className="col d-flex flex-column">
              <div className="row">
                <form onSubmit={handleFormSubmit} autoComplete="off">
                  {/* <input type="hidden" name="age" /> */}

                  <div className="card-body">
                    <div className="row row-cards">
                      <div className="col-md-6 col-sm-12">
                        <InputText
                          label="Name"
                          name="name"
                          required={true}
                          value={form.name}
                          handleChange={handleChange}
                          autoFocus={true}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <InputText
                          label="Father's / Husband's name"
                          name="fatherHusbandName"
                          required={true}
                          value={form.fatherHusbandName}
                          handleChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <MasterDistricts />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <MasterSubDivs />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default PersonalInfo;
