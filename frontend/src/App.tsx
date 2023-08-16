import { RouterProvider } from "react-router-dom";

import { AuthProvider } from "@context/auth";
import { ModalProvider } from "@context/modals";
import { Modals } from "@components/Modal";

import { router } from "./router";

function App() {
  return (
    <AuthProvider>
      <ModalProvider>
        <Modals />
        <RouterProvider router={router} />
      </ModalProvider>
    </AuthProvider>
  );
}

export default App;
