import { BrowserRouter, Routes, Route } from "react-router-dom";

import { StylesProvider } from "@context/styles";

import { Layout } from "@layout";
import { Dashboard } from "@features/dashboard";
import { AddToken } from "@features/tokens";
import { Login } from "@features/login";
import { ModalProvider } from "@context/modals";
import { Modals } from "@components/Modal";

function App() {
  return (
    <ModalProvider>
      <Modals />
      <StylesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/dashboard" element={<Layout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="add" element={<AddToken />} />
            </Route> */}
          </Routes>
        </BrowserRouter>
      </StylesProvider>
    </ModalProvider>
  );
}

export default App;
