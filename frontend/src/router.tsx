import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@layout";
import { Dashboard } from "@features/dashboard";
import { AddToken, SellToken, TransferToken } from "@features/tokens";
import { Login } from "@features/login";
import { RequireAuth } from "@components/RequireAuth";
import { NotFound } from "@components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        // loader: ({ request }) =>
        // fetch("/api/dashboard.json", {
        //   signal: request.signal,
        // }),
      },
      {
        path: "/tokens",
        children: [
          {
            path: "add",
            element: <AddToken />,
          },
          {
            path: "sell",
            element: <SellToken />,
          },
          {
            path: "transfer",
            element: <TransferToken />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: (
      <RequireAuth>
        <NotFound />
      </RequireAuth>
    ),
  },
]);
