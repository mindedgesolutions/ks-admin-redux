import React, { createContext, useContext, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import {
  UserFooter,
  UserPageLoader,
  UserSidebar,
  UserTopNav,
} from "../../../components";
import { splitErrors } from "../../../utils/showErrors";
import customFetch from "../../../utils/customFetch";
import { toast } from "react-toastify";

import "../../../assets/dist/css/tabler.min.css";
import "../../../assets/dist/css/demo.min.css";

import "../../../assets/dist/js/tabler.min.js";
import "../../../assets/dist/js/demo.min.js";
import {
  addAccessToLocalStorage,
  removeAccessFromLocalStorage,
} from "../../../utils/data.jsx";

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

const UserContext = createContext();

const UserLayout = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useLoaderData();
  const [appUser, setAppUser] = useState(
    data.data.rowCount > 0 ? data.data.rows[0] : ""
  );
  const [appId, setAppId] = useState(
    data.data.rowCount > 0 ? data.data.rows[0].id : ""
  );
  const [userMwin, setUserMwin] = useState({
    mwin: data?.data?.rows[0]?.identification_number || "",
    status: data?.data?.rows[0]?.status || "I",
    mobile: data?.data?.rows[0]?.mobile || "",
    regDate: data?.data?.rows[0]?.created_date || "",
  });

  const logoutAppUser = async () => {
    await customFetch.get("/auth/user-logout");
    removeAccessFromLocalStorage();
    toast.success(`User logged out`);
    navigate("/otplogin");
  };

  if (navigation.state === "loading") {
    return <UserPageLoader />;
  }

  return (
    <UserContext.Provider
      value={{
        appUser,
        setAppUser,
        appId,
        setAppId,
        logoutAppUser,
        userMwin,
        setUserMwin,
      }}
    >
      <UserTopNav />
      <UserSidebar />
      <div className="page-wrapper">
        <Outlet />
        <UserFooter />
      </div>
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
export default UserLayout;
