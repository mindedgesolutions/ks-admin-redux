import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import * as Ks from "./pages";

const router = createBrowserRouter([
  // Website related starts ------
  {
    path: "/",
    element: <Ks.LayoutWebsite />,
    children: [
      { index: true, element: <Ks.Home /> },
      { path: "notifications", element: <Ks.Notifications /> },
      { path: "schemes", element: <Ks.Schemes /> },
      { path: "faq", element: <Ks.Faq /> },
      { path: "stakeholders", element: <Ks.StakeHolders /> },
    ],
  },
  // Website related ends ------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
