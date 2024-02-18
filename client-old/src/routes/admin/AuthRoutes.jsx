import React from "react";
import { Route, Routes } from "react-router-dom";
import { Error, Login, ForgotPassword, Logout } from "../../pages";

// Actions ---
import { action as loginAction } from "../../pages/admin/Login";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route
        path="login"
        element={<Login />}
        errorElement={<Error />}
        action={loginAction}
      />
      <Route
        path="forgot-password"
        element={<ForgotPassword />}
        errorElement={<Error />}
      />
      <Route path="logout" element={<Logout />} errorElement={<Error />} />
    </Routes>
  );
};

export default AuthRoutes;
