import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "./context/auth";
import { DappProvider } from "./context/dapp";
import { ModalProvider } from "./context/modals";
import { router } from "./router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <DappProvider>
      <ModalProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </ModalProvider>
    </DappProvider>
  </AuthProvider>
);
