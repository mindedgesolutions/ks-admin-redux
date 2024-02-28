import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Ks from "./pages";
import { store } from "./store";

// Loaders ------
import { loader as userLayout } from "./pages/application/user/UserLayout";
import { loader as personalLoader } from "./pages/application/user/application/PersonalInfo";

// Actions ------
import { action as otpLogin } from "./components/website/LoginForm";
// import { action as personalAction } from "./pages/application/user/application/PersonalInfo";

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
    loader: userLayout(store),
    children: [
      { path: "dashboard", element: <Ks.UserDashboard /> },
      {
        path: "personal-info",
        element: <Ks.PersonalInfo />,
        loader: personalLoader(store),
        // action: personalAction(store),
      },
      { path: "worksite-info", element: <Ks.WorkInfo /> },
      { path: "agency-info", element: <Ks.AgencyInfo /> },
      { path: "bank-nominee-info", element: <Ks.BankNominee /> },
      { path: "family-info", element: <Ks.Family /> },
      { path: "documents", element: <Ks.Documents /> },
      { path: "overview", element: <Ks.OverView /> },
    ],
  },
  // User app related ends ------
  // Admin app related starts ------
  {
    path: "/admin",
    element: <Ks.AdminLayout />,
    children: [{ path: "dashboard", element: <Ks.AdminDashboard /> }],
  },
  // Admin app related ends ------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
