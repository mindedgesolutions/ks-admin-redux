import React from "react";
import { UserFooter, UserSideBar, UserTopNav } from "../../../components";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";

import "../../../assets/dist/css/tabler.min.css";
import "../../../assets/dist/css/demo.min.css";

import "../../../assets/dist/js/tabler.min.js";
import "../../../assets/dist/js/demo.min.js";

import customFetch from "../../../utils/customFetch.js";
import { splitErrors } from "../../../utils/showErrors.jsx";
import {
  addAccessToLocalStorage,
  removeAccessFromLocalStorage,
} from "../../../utils/data.jsx";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeMobile } from "../../../features/otplogin/otpLoginSlice.js";
import { userInfo } from "../../../features/user/userDetailsSlice.js";
import { toast } from "react-toastify";

// Loader starts ------
export const loader = async () => {
  try {
    const appUser = await customFetch.get("/users/current-app-user");
    const userAccess = await customFetch.get(
      "/applications/user/application-access"
    );
    addAccessToLocalStorage(userAccess.data.data);
    return appUser;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect("/otplogin");
  }
};

// Main component starts ------
const UserLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appUser = useLoaderData();

  const logout = async () => {
    await customFetch.get("/auth/user-logout");
    removeAccessFromLocalStorage();
    toast.success(`User logged out`);
    navigate("/otplogin");
  };

  useEffect(() => {
    dispatch(changeMobile());
    dispatch(
      userInfo({
        name: appUser?.data?.data?.rows[0]?.name || null,
        mwin: appUser?.data?.data?.rows[0]?.identification_number || null,
        status: appUser?.data?.data?.rows[0]?.status || "I",
        mobile: appUser?.data?.data?.rows[0]?.mobile || null,
        regDate: appUser?.data?.data?.rows[0]?.created_date || null,
      })
    );
  }, []);

  return (
    <>
      <UserTopNav logout={logout} />
      <UserSideBar />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <UserFooter />
    </>
  );
};

export default UserLayout;
