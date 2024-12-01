import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@context/auth";
import { DappProvider } from "@context/dapp";
import { ModalProvider } from "@context/modals";
import { ThemeProvider } from "@context/theme";

import { router } from "./router";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <DappProvider>
    <ThemeProvider>
      <ModalProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </ModalProvider>
    </ThemeProvider>
    </DappProvider>
  </AuthProvider>
);
