import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@context/auth";
import { DappProvider } from "@context/dapp";
import { ModalProvider } from "@context/modals";
import { Modals } from "@components/Modal";

import { router } from "./router";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <DappProvider>
        <ModalProvider>
          <ToastContainer />
          <Modals />
          <RouterProvider router={router} />
        </ModalProvider>
      </DappProvider>
    </AuthProvider>
  );
}

export default App;
