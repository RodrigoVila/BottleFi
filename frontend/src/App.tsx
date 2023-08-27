import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@context/auth";
import { ModalProvider } from "@context/modals";
import { Modals } from "@components/Modal";

import { router } from "./router";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <ToastContainer />
        <Modals />
        <RouterProvider router={router} />
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
