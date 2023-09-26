import { createBrowserRouter } from "react-router-dom";

import { Dashboard } from "@features/dashboard";
import { Login } from "@features/login";
import {
  MintToken,
  SellToken,
  TokenValidity,
  TransferToken,
  VerifyToken,
} from "@features/tokens";
import { NotFound } from "@components/NotFound";

import { App } from "./App";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "mint",
        element: <MintToken />,
      },
      {
        path: "sell",
        element: <SellToken />,
      },
      {
        path: "transfer",
        element: <TransferToken />,
      },
      {
        path: "verify",
        children: [
          {
            path: "",
            element: <VerifyToken />,
          },
          {
            path: ":tokenId",
            element: <TokenValidity />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
