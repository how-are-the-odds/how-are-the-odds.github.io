import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import IndexApp from "./IndexApp.tsx";
import ErrorPage from "./ErrorPage.tsx";
import MethodologyApp from "./MethodologyApp.tsx";
import StaticApp from "./StaticApp.tsx";
import LiveGameApp from "./LiveGameApp.tsx";

const router = createHashRouter([
  {
    path: "/index",
    element: <IndexApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/methodology",
    element: <MethodologyApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/static",
    element: <StaticApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/livegames",
    element: <LiveGameApp />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <IndexApp /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
