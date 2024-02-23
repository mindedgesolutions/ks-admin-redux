import React from "react";
import { UserFooter, UserSideBar, UserTopNav } from "../../../components";
import { Outlet } from "react-router-dom";

import "../../../assets/dist/css/tabler.min.css";
import "../../../assets/dist/css/demo.min.css";

import "../../../assets/dist/js/tabler.min.js";
import "../../../assets/dist/js/demo.min.js";
import customFetch from "../../../utils/customFetch.js";
import { splitErrors } from "../../../utils/showErrors.jsx";
import { addAccessToLocalStorage } from "../../../utils/data.jsx";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-app-user");
    const userAccess = await customFetch.get(
      "/applications/user/application-access"
    );
    addAccessToLocalStorage(userAccess.data.data);
    return data;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect("/otplogin");
  }
};

const UserLayout = () => {
  return (
    <>
      <UserTopNav />
      <UserSideBar />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <UserFooter />
    </>
  );
};

export default UserLayout;
