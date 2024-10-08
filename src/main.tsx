import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import { ErrorPage } from "./ErrorPage";
import VotingApp from "./voting/VotingApp";
import { loader as votingLoader } from "./voting/VotingApp";
import MapPage from "./voting/MapPage";
import BaseballPage from "./baseball/BaseballPage";
import BaseballApp from "./baseball/BaseballApp";
import BaseballDoc from "./baseball/Components/BaseballDoc";
import MicrogradApp from "./neuralnets/MicrogradApp";
import BlogApp from "./blog/BlogApp";
import BlogEntry from "./blog/BlogEntry";
import JeopardyApp from "./jeopardy/JeopardyApp";
import AllergyChecker from "./allergies/AllergyChecker";

const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "baseball",
        element: <BaseballPage></BaseballPage>,
        children: [
          {
            path: "predictor",
            element: <BaseballApp></BaseballApp>,
          },
          {
            path: "documentation",
            element: <BaseballDoc></BaseballDoc>,
          },
        ],
      },
      {path: "allergy-checker", element: <AllergyChecker></AllergyChecker>},
      { path: "jeopardy", element: <JeopardyApp></JeopardyApp> },
      {
        path: "machine-learning",
        element: <MicrogradApp></MicrogradApp>,
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
      {
        path: "blog",
        element: <BlogApp></BlogApp>,
      },
      {
        path: "blog/:entry",
        element: <BlogEntry></BlogEntry>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
