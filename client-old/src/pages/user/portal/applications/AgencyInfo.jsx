import React, { useState } from "react";
import {
  BtnSpinner,
  UserPageHeader,
  UserPageWrapper,
  WithAgent,
  WithoutAgent,
} from "../../../../components";
import ApplicationMenu from "../../../../components/user/portal/application/ApplicationMenu";
import { engageTypes, getAccessFromLocalStorage } from "../../../../utils/data";
import { nanoid } from "nanoid";
import { splitErrors } from "../../../../utils/showErrors";
import customFetch from "../../../../utils/customFetch";
import { useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../UserLayout";
import { useDispatch } from "react-redux";
import { updateAccess } from "../../../../features/access/accessSlice";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/applications/user/agency-info");
    return data;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

const AgencyInfo = () => {
  document.title = `Agency / Employer Information | ${
    import.meta.env.VITE_USER_TITLE
  }`;
  const navigate = useNavigate();
  const { appId, userMwin, setUserMwin } = useUserContext();
  const { data } = useLoaderData();
  const info = data.rowCount > 0 ? data.rows[0] : "";
  const [isIdle, setIsIdle] = useState(false);
  const [selectedOption, setSelectedOption] = useState(info?.engaged_as || "");
  const [userAccess, setUserAcess] = useState(getAccessFromLocalStorage());
  const dispatch = useDispatch();

  const handleFormSubmit = async (e) => {
    setIsIdle(true);
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.patch(
        `/applications/user/agency-info`,
        data
      );
      toast.success(`Information updated`);
      setIsIdle(false);

      setUserMwin({
        ...userMwin,
        mwin: response.data.response.mwin,
        status: "P",
        mobile: response.data.response.mobile,
        regDate: response.data.response.createdDate,
      });

      const newSet = { ...userAccess, bank: true };
      setUserAcess(newSet);
      dispatch(updateAccess(newSet));

      navigate("/user/dashboard");
    } catch (error) {
      splitErrors(error?.response?.data?.msg);
      setIsIdle(false);
      return error;
    }
  };

  return (
    <>
      <UserPageHeader title="Agency / Employer Information" />
      <UserPageWrapper>
        <div className="card">
          <div className="row g-0">
            <ApplicationMenu />

            <div className="col d-flex flex-column">
              <form onSubmit={handleFormSubmit} autoComplete="off">
                <input type="hidden" name="appId" defaultValue={appId} />

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
                                checked={selectedOption === option.value}
                                onChange={(e) =>
                                  setSelectedOption(e.target.value)
                                }
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
                  {selectedOption === "Agency" && <WithAgent info={info} />}
                  {selectedOption === "Without-agency" && (
                    <WithoutAgent info={info} />
                  )}
                  <div className="mt-5">
                    <button
                      type="submit"
                      className="btn btn-success"
                      disabled={isIdle}
                    >
                      {isIdle && <BtnSpinner />}
                      Save and continue
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </UserPageWrapper>
    </>
  );
};

export default AgencyInfo;
