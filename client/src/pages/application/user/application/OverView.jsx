import React from "react";
import {
  OverviewSideBar,
  OverviewTabList,
  UserPageHeader,
  UserPageWrapper,
  ViewAgency,
  ViewBankNominee,
  ViewDocuments,
  ViewFamily,
  ViewPersonal,
  ViewWorksite,
} from "../../../../components";
import { useSelector } from "react-redux";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";
import { setStateList } from "../../../../features/masters/statesSlice";
import { setJobList } from "../../../../features/masters/jobsSlice";

// Loader starts ------
export const loader = (store) => async () => {
  try {
    const info = await customFetch.get(
      "/applications/user/complete-personal-info"
    );
    const work = await customFetch.get("/applications/user/worksite-info");
    const agency = await customFetch.get("/applications/user/agency-info");

    const states = await customFetch.get("/master/states");
    const jobs = await customFetch.get("/master/jobs");

    store.dispatch(setStateList(states.data.data.rows));
    store.dispatch(setJobList(jobs.data.data.rows));

    return { info, work, info };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const OverView = () => {
  document.title = `Application Overview | ${import.meta.env.VITE_USER_TITLE}`;
  const { user } = useSelector((store) => store.user);
  const { currentTab } = useSelector((store) => store.overview);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <UserPageHeader title="Application Overview" />
      <UserPageWrapper>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <input type="hidden" name="appId" value={user.id} />

          <div className="card pe-0">
            <div className="row g-0">
              <OverviewSideBar />

              <div className="col d-flex flex-column">
                <div className="row">
                  <div className="card-body pt-2">
                    <OverviewTabList />

                    <div className="card-body">
                      <div className="tab-content">
                        {currentTab === "personal" && <ViewPersonal />}
                        {currentTab === "worksite" && <ViewWorksite />}
                        {currentTab === "agency" && <ViewAgency />}
                        {currentTab === "bank" && <ViewBankNominee />}
                        {currentTab === "family" && <ViewFamily />}
                        {currentTab === "documents" && <ViewDocuments />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </UserPageWrapper>
    </>
  );
};

export default OverView;
