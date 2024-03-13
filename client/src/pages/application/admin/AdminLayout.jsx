import React from "react";
import { Outlet, redirect, useNavigate } from "react-router-dom";
import { AdminFooter, AdminSideBar, AdminTopNav } from "../../../components";

import "../../../assets/dist/css/tabler.min.css";
import "../../../assets/dist/css/demo.min.css";

import "../../../assets/dist/js/tabler.min.js";
import "../../../assets/dist/js/demo.min.js";

import "react-datepicker/dist/react-datepicker.css";
import customFetch from "../../../utils/customFetch.js";
import { splitErrors } from "../../../utils/showErrors.jsx";
import {
  details,
  resetAdminBasic,
} from "../../../features/admin/adminBasicSlice.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export const loader = (store) => async () => {
  try {
    const response = await customFetch.get("/users/current-user");
    store.dispatch(details(response.data.data.rows[0]));
    return response;
  } catch (error) {
    splitErrors(error?.response?.data?.msg);
    return redirect("/admin/login");
  }
};

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    await customFetch.get("/auth/logout");
    dispatch(resetAdminBasic());
    toast.success(`User logged out`);
    navigate("/admin/login");
  };

  return (
    <>
      <AdminTopNav logout={logout} />
      <AdminSideBar />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminLayout;
