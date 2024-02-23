import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Ks from "./pages";

// Loaders start ------

// Action start ------
import { action as otpLogin } from "./components/website/LoginForm";

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

  // User related starts ------
  {
    path: "/user",
    element: <Ks.UserLayout />,
    children: [{ path: "dashboard", element: <Ks.AdminDashboard /> }],
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
