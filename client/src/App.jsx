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

// Actions ------
import { action as otpLogin } from "./components/website/LoginForm";
import { action as adminLogin } from "./pages/application/admin/login/AdminLogin";
import { action as adminForgotPass } from "./pages/application/admin/login/AdminForgotPassword";
import { action as updateProfile } from "./pages/application/admin/profile/UpdateProfile";

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
      { path: "change-password", element: <Ks.ChangePassword /> },
      { path: "notifications", element: <Ks.AdminNotifications /> },
    ],
  },
  // Admin app related ends ------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
