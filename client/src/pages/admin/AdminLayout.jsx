import React, { createContext, useContext } from "react";
import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";

import "../../assets/dist/css/tabler.min.css";
import "../../assets/dist/css/demo.min.css";

import "../../assets/dist/js/tabler.min.js";
import "../../assets/dist/js/demo.min.js";

import "react-datepicker/dist/react-datepicker.css";

import { Footer, Sidebar, TopNav } from "../../components";
import customFetch from "../../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/admin/login");
  }
};

const AdminContext = createContext();

const AdminLayout = () => {
  const navigate = useNavigate();

  const data = useLoaderData();
  const userInfo = data.data.rows[0];
  const { id, name, rid, role_name } = userInfo;
  const user = { userId: id, name: name, role: role_name, rid: rid };

  const logoutUser = async () => {
    await customFetch.get("/auth/logout");
    toast.success(`User logged out`);
    navigate("/admin/login");
  };

  return (
    <AdminContext.Provider value={{ user, logoutUser }}>
      <Sidebar />
      <TopNav />
      <div className="page-wrapper">
        <Outlet />
        <Footer />
      </div>
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
export default AdminLayout;
