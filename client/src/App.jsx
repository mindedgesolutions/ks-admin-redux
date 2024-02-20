import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Ks from "./pages";

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
      { path: "/otplogin", element: <Ks.OtpLogin /> },
    ],
  },
  // Website related ends ------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
