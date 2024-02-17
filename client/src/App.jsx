import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Pages from "./pages";

// Admin actions
import { action as loginAction } from "./pages/admin/Login";
import { action as profileAction } from "./pages/admin/profile/UpdateProfile";
import { action as passwordAction } from "./pages/admin/profile/ChangePassword";

// Admin loaders
import { loader as adminLayoutLoader } from "./pages/admin/AdminLayout";
import { loader as profileLoader } from "./pages/admin/profile/UpdateProfile";
import { loader as dsDistrictsApp } from "./pages/admin/reports/ds/DsApplicationStatus";
import { loader as dsDistrictsMig } from "./pages/admin/reports/ds/DsMigrationStatus";
import { loader as dsApplicationList } from "./pages/admin/applications/ApplicationList";
import { loader as applicationSingle } from "./pages/admin/applications/ApplicationSingle";

// Website loaders

// Website actions
import { action as userOtpLogin } from "./components/user/website/OtpLoginForm";

// User loaders
import { loader as userLayoutLoader } from "./pages/user/portal/UserLayout";
import { loader as banks } from "./pages/user/portal/applications/BankInfo";
import { loader as schemes } from "./pages/user/portal/applications/FamilyInfo";
import { loader as personalInfo } from "./pages/user/portal/applications/PersonalInfo";
import { loader as worksiteInfo } from "./pages/user/portal/applications/WorksiteInfo";
import { loader as agencyInfo } from "./pages/user/portal/applications/AgencyInfo";

const router = createBrowserRouter([
  // Website routes start ------
  {
    path: "/",
    element: <Pages.WebsiteLayout />,
    errorElement: <Pages.WebsiteError />,
    children: [
      { index: true, element: <Pages.Landing /> },
      { path: "notifications", element: <Pages.WebsiteNotifications /> },
      { path: "schemes", element: <Pages.Schemes /> },
      {
        path: "otplogin",
        element: <Pages.UserOtpLogin />,
        action: userOtpLogin,
      },
      { path: "sign-up", element: <Pages.UserSignUp /> },
      { path: "user-login", element: <Pages.UserCredentialLogin /> },
      { path: "forgot-password", element: <Pages.UserForgotPassword /> },
    ],
  },
  // Website routes end ------
  // User application routes start ------
  {
    path: "/user",
    element: <Pages.UserLayout />,
    errorElement: <Pages.UserError />,
    loader: userLayoutLoader,
    children: [
      { path: "dashboard", element: <Pages.UserDashboard /> },
      {
        path: "personal-info",
        element: <Pages.PersonalInfo />,
        loader: personalInfo,
      },
      {
        path: "worksite-info",
        element: <Pages.WorksiteInfo />,
        loader: worksiteInfo,
      },
      {
        path: "agency-info",
        element: <Pages.AgencyInfo />,
        loader: agencyInfo,
      },
      { path: "nominee-info", element: <Pages.BankInfo />, loader: banks },
      { path: "family-info", element: <Pages.FamilyInfo />, loader: schemes },
      { path: "documents", element: <Pages.Documents /> },
      { path: "overview", element: <Pages.OverView /> },
    ],
  },
  // User application routes end ------
  // Admin panel routes start ------
  {
    path: "/admin",
    element: <Pages.Layout />,
    errorElement: <Pages.Error />,
    children: [
      { path: "login", element: <Pages.Login />, action: loginAction },
      { path: "forgot-password", element: <Pages.ForgotPassword /> },
      { path: "logout", element: <Pages.Logout /> },
    ],
  },
  {
    path: "/admin",
    element: <Pages.AdminLayout />,
    errorElement: <Pages.Error />,
    loader: adminLayoutLoader,
    children: [
      { path: "dashboard", element: <Pages.Dashboard /> },
      {
        path: "profile",
        element: <Pages.UpdateProfile />,
        loader: profileLoader,
        action: profileAction,
      },
      { path: "notifications", element: <Pages.Notifications /> },
      {
        path: "change-password",
        element: <Pages.ChangePassword />,
        action: passwordAction,
      },
      {
        path: "applications",
        element: <Pages.ApplicationList />,
        errorElement: <Pages.Error />,
        loader: dsApplicationList,
      },
      {
        path: "applications/:id",
        element: <Pages.ApplicationSingle />,
        errorElement: <Pages.Error />,
        loader: applicationSingle,
      },
      {
        path: "reports",
        errorElement: <Pages.Error />,
        children: [
          { index: true, element: <Pages.Reports /> },
          {
            path: "bsk/application-status",
            element: <Pages.BskApplicationStatus />,
          },
          {
            path: "ds/application-status",
            element: <Pages.DsApplicationStatus />,
            loader: dsDistrictsApp,
          },
          {
            path: "ds/deo",
            element: <Pages.DsDeo />,
          },
          {
            path: "ds/migration-status",
            element: <Pages.DsMigrationStatus />,
            loader: dsDistrictsMig,
          },
          {
            path: "ks/application-status",
            element: <Pages.KsApplicationStatus />,
          },
          {
            path: "sd/static",
            element: <Pages.SdStaticAtFive />,
          },
        ],
      },
    ],
  },
  // Admin panel routes end ------
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
