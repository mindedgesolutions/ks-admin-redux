import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Ks from "./pages";

// Loaders start ------
import { loader as userLayoutLoader } from "./pages/application/user/UserLayout";
import { loader as personalInfoLoader } from "./pages/application/user/application/PersonalInfo";

// Action start ------
import { action as otpLoginLoader } from "./components/website/LoginForm";

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
      { path: "/otplogin", element: <Ks.OtpLogin />, action: otpLoginLoader },
    ],
  },
  // Website related ends ------

  // User related starts ------
  {
    path: "/user",
    element: <Ks.UserLayout />,
    loader: userLayoutLoader,
    children: [
      { path: "dashboard", element: <Ks.AdminDashboard /> },
      {
        path: "personal-info",
        element: <Ks.PersonalInfo />,
        loader: personalInfoLoader,
      },
      { path: "worksite-info", element: <Ks.WorksiteInfo /> },
      { path: "agency-info", element: <Ks.AgencyInfo /> },
      { path: "bank-nominee-info", element: <Ks.BankNomineeInfo /> },
      { path: "family-info", element: <Ks.FamilyInfo /> },
      { path: "documents", element: <Ks.Documents /> },
    ],
  },
  // User related ends ------

  // Admin related starts ------
  {
    path: "/admin",
    element: <Ks.AdminLayout />,
    children: [{ path: "dashboard", element: <Ks.AdminDashboard /> }],
  },
  // Admin related ends ------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
