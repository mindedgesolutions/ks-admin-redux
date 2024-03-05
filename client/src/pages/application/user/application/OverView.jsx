import React from "react";
import {
  OverviewSideBar,
  UserPageHeader,
  UserPageWrapper,
} from "../../../../components";
import { useSelector } from "react-redux";
import customFetch from "../../../../utils/customFetch";
import { splitErrors } from "../../../../utils/showErrors";

// Loader starts ------
export const loader = async () => {
  try {
    const info = await customFetch.get("/users/app-user-complete");
    return { info };
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return error;
  }
};

// Main component starts ------
const OverView = () => {
  const { user } = useSelector((store) => store.user);

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
                  <div className="card-body"></div>
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
