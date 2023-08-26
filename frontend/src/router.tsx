import { createBrowserRouter } from "react-router-dom";

import { Layout } from "@layout";
import { Dashboard } from "@features/dashboard";
import { MintToken, InvalidateToken, TransferToken } from "@features/tokens";
import { Login } from "@features/login";
import { RequireAuth } from "@components/Require";
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
        path: "mint",
        element: <MintToken />,
      },
      {
        path: "invalidate",
        element: <InvalidateToken />,
      },
      {
        path: "transfer",
        element: <TransferToken />,
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
