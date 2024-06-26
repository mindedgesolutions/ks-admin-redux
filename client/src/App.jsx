import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Ks from "./pages";
import { store } from "./store";

// Loaders ------
import { loader as userLayout } from "./pages/application/user/UserLayout";
import { loader as personalLoader } from "./pages/application/user/application/PersonalInfo";
import { loader as worksiteLoader } from "./pages/application/user/application/WorkInfo";
import { loader as agencyLoader } from "./pages/application/user/application/AgencyInfo";
import { loader as bankNomineeLoader } from "./pages/application/user/application/BankNominee";
import { loader as familyLoader } from "./pages/application/user/application/Family";
import { loader as viewLoader } from "./pages/application/user/application/OverView";

import { loader as adminLayout } from "./pages/application/admin/AdminLayout";
import { loader as deoListLoader } from "./pages/application/admin/reports/ds/DsDeoList";
import { loader as ksOriginDetails } from "./pages/application/admin/reports/ks/KsOriginationDetails";

// Actions ------
import { action as otpLogin } from "./components/website/LoginForm";
import { action as adminLogin } from "./pages/application/admin/login/AdminLogin";
import { action as adminForgotPass } from "./pages/application/admin/login/AdminForgotPassword";
import { action as updateProfile } from "./pages/application/admin/profile/UpdateProfile";
import { action as changePassword } from "./pages/application/admin/profile/ChangePassword";

const router = createBrowserRouter([
  // Website related starts ------
  {
    path: "/",
    element: <Ks.WebsiteLayout />,
    children: [
      { index: true, element: <Ks.Home /> },
      { path: "/notifications", element: <Ks.Notifications /> },
      { path: "/schemes", element: <Ks.Schemes /> },
      { path: "/faq", element: <Ks.Faq /> },
      { path: "/stakeholders", element: <Ks.StakeHolders /> },
      { path: "/contact-us", element: <Ks.Contact /> },
      { path: "/otplogin", element: <Ks.OtpLogin />, action: otpLogin },
    ],
  },
  // Website related ends ------
  // User app related starts ------
  {
    path: "/user",
    element: <Ks.UserLayout />,
    errorElement: <Ks.ApplicationError />,
    loader: userLayout(store),
    children: [
      { path: "dashboard", element: <Ks.UserDashboard /> },
      {
        path: "personal-info",
        element: <Ks.PersonalInfo />,
        loader: personalLoader(store),
      },
      {
        path: "worksite-info",
        element: <Ks.WorkInfo />,
        loader: worksiteLoader(store),
      },
      {
        path: "agency-info",
        element: <Ks.AgencyInfo />,
        loader: agencyLoader,
      },
      {
        path: "bank-nominee-info",
        element: <Ks.BankNominee />,
        loader: bankNomineeLoader(store),
      },
      {
        path: "family-info",
        element: <Ks.Family />,
        loader: familyLoader(store),
      },
      { path: "documents", element: <Ks.Documents /> },
      {
        path: "overview",
        element: <Ks.OverView />,
        loader: viewLoader(store),
      },
    ],
  },
  // User app related ends ------
  // Admin app related starts ------
  {
    path: "/admin/login",
    element: <Ks.AdminLogin />,
    action: adminLogin(store),
  },
  {
    path: "/admin/forgot-password",
    element: <Ks.AdminForgotPassword />,
    action: adminForgotPass,
  },
  {
    path: "/admin",
    element: <Ks.AdminLayout />,
    loader: adminLayout(store),
    children: [
      { path: "dashboard", element: <Ks.AdminDashboard /> },
      {
        path: "profile",
        element: <Ks.UpdateProfile />,
        action: updateProfile(store),
      },
      {
        path: "change-password",
        element: <Ks.ChangePassword />,
        action: changePassword,
      },
      { path: "notifications", element: <Ks.AdminNotifications /> },
      { path: "search-application", element: <Ks.SearchApplication /> },
      {
        path: "reports", // Admin reports start ------
        children: [
          { index: true, element: <Ks.AllReports /> },
          {
            path: "ds/application-status/:id?",
            element: <Ks.DsApplicationStatus />,
          },
          { path: "ds/static/:id?", element: <Ks.DsStaticAtFive /> },
          { path: "ds/deo/:id?", element: <Ks.DsDeo /> },
          {
            path: "ds/deo-list/:id?",
            element: <Ks.DsDeoList />,
            loader: deoListLoader(store),
          },
          {
            path: "ds/deo-application-list/:id?",
            element: <Ks.DsDeoApplicationList />,
          },
          {
            path: "bsk/application-status",
            element: <Ks.BskApplicationStatus />,
          },
          { path: "ks/origination", element: <Ks.KsOrigination /> },
          {
            path: "ks/origination-details",
            element: <Ks.KsOriginationDetails />,
            loader: ksOriginDetails(store),
          },
          {
            path: "ks/application-status",
            element: <Ks.KsApplicationStatus />,
          },
          // { path: "sd/static", element: <Ks.SdStaticAtFive /> },
          { path: "sd/digitised", element: <Ks.SdTotalDigitised /> },
          { path: "sd/deo", element: <Ks.SdDeo /> },
          { path: "sd/deo-list", element: <Ks.SdDeoList /> },
          {
            path: "analysis/social-category",
            element: <Ks.AnalysisSocialCategory />,
          },
          { path: "analysis/religion", element: <Ks.AnalysisReligion /> },
          { path: "analysis/gender", element: <Ks.AnalysisGender /> },
          { path: "analysis/rural-urban", element: <Ks.AnalysisRuralUrban /> },
          { path: "analysis/destination", element: <Ks.AnalysisDestination /> },
          {
            path: "ssjs/application-status",
            element: <Ks.SsjsApplicationStatus />,
          },
          { path: "ssjs/deo", element: <Ks.SsjsDeo /> },
        ],
      }, // Admin reports end ------
      { path: "applications", element: <Ks.AllApplications /> },
    ],
  },
  // Admin app related ends ------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
