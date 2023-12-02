import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import { ErrorPage } from "./ErrorPage";
import BaseBallApp from "./baseball/BaseballApp";
import VotingApp from "./voting/VotingApp";
import {loader as votingLoader} from "./voting/VotingApp";
import MapPage from "./voting/MapPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "baseball",
        element: <BaseBallApp></BaseBallApp>,
      },
      {
        path: "politics",
        element: <VotingApp></VotingApp>,
        children: [
          {
            path: "partisan",
            element: <MapPage></MapPage>,
            loader: () => votingLoader(true),
          },
          {
            path: "nonpartisan",
            element: <MapPage></MapPage>,
            loader: () => votingLoader(false),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
