import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@layout";

import { Dashboard } from "@features/dashboard";
import { Login } from "@features/login";
import { InvalidateToken, MintToken, TransferToken } from "@features/tokens";
import { NotFound } from "@components/NotFound";
import { RequireAuthAndRole } from "@components/RequireAuthAndRole";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <RequireAuthAndRole>
        <Layout />
      </RequireAuthAndRole>
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
    element: <NotFound />,
  },
]);
