import React, { useState } from "react";
import {
  ApplicationMenu,
  SubmitBtn,
  UserAppLoader,
  UserPageHeader,
  UserPageWrapper,
  WithAgent,
  WithoutAgent,
} from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, useNavigate, useNavigation } from "react-router-dom";
import { engageTypes } from "../../../../utils/data";
import { nanoid } from "nanoid";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import { toast } from "react-toastify";
import { access, details } from "../../../../features/user/userBasicSlice";

// Loader starts ------
export const loader = async () => {
  try {
    const info = await customFetch.get("/applications/user/agency-info");
    return info;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const AgencyInfo = () => {
  document.title = `Agency / Employer Information | ${
    import.meta.env.VITE_USER_TITLE
  }`;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const info = useLoaderData();
  const navigation = useNavigation();

  const { user } = useSelector((store) => store.user);

  const [form, setForm] = useState({
    empType: info?.data?.data?.rows[0]?.engaged_as || "",
    isLoading: false,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setForm({ ...form, isLoading: true });
    const formData = new FormData(e.currentTarget);
    const inputValues = Object.fromEntries(formData);
    try {
      const response = await customFetch.patch(
        `/applications/user/agency-info`,
        inputValues
      );

      dispatch(access("bank"));
      dispatch(
        details({
          identification_number: response.data.response.mwin,
          status: "P",
          mobile: response.data.response.mobile,
          created_date: response.data.response.createdDate,
        })
      );

      setForm({ ...form, isLoading: false });
      toast.success(`Information updated`);
      navigate("/user/dashboard");
    } catch (error) {
      setForm({ ...form, isLoading: false });
      splitErrors(error?.response?.data?.msg);
      console.log(error);
    }
  };

  return (
    <>
      <UserPageHeader title="Agency / Employer Information" />
      <UserPageWrapper>
        <div className="card pe-0">
          <div className="row g-0">
            <ApplicationMenu />

            <div className="col d-flex flex-column">
              <form onSubmit={handleFormSubmit} autoComplete="off">
                <input type="hidden" name="appId" value={user.id} />

                {navigation.state === "loading" ? (
                  <UserAppLoader />
                ) : (
                  <div className="card-body">
                    <div className="row row-cards">
                      <div className="col-md-6 col-sm-12">
                        <label className="form-label mb-3 required">
                          Engaged as
                        </label>
                        {engageTypes.map((option) => {
                          return (
                            <div key={nanoid()}>
                              <label className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  value={option.value}
                                  name="empType"
                                  checked={form.empType === option.value}
                                  onChange={handleChange}
                                />
                                <span className="form-check-label">
                                  {option.text}
                                </span>
                              </label>
                              <br />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {form.empType === "Agency" && <WithAgent />}
                    {form.empType === "Without-agency" && <WithoutAgent />}

                    <div className="mt-5">
                      <SubmitBtn isLoading={form.isLoading} />
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default AgencyInfo;
