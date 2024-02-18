import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  ApplicationList,
  ApplicationSingle,
  ChangePassword,
  Dashboard,
  Error,
  Notifications,
  UpdateProfile,
} from "../../pages";

import { action as profileAction } from "../../pages/admin/profile/UpdateProfile";
import { action as passwordAction } from "../../pages/admin/profile/ChangePassword";

// Loaders
import { loader as profileLoader } from "../../pages/admin/profile/UpdateProfile";
import { loader as dsApplicationList } from "../../pages/admin/ApplicationList";
import { loader as applicationSingle } from "../../pages/admin/ApplicationSingle";

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route
        path="profile"
        element={<UpdateProfile />}
        loader={profileLoader}
        action={profileAction}
      />
      <Route path="notifications" element={<Notifications />} />
      <Route
        path="change-password"
        element={<ChangePassword />}
        action={passwordAction}
      />
      <Route
        path="applications"
        element={<ApplicationList />}
        errorElement={<Error />}
        loader={dsApplicationList}
      />
      <Route
        path="applications/:id"
        element={<ApplicationSingle />}
        errorElement={<Error />}
        loader={applicationSingle}
      />
    </Routes>
  );
};

export default PageRoutes;
