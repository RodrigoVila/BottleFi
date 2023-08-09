import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "@layout";
import { Dashboard } from "@features/dashboard";
import { AddToken } from "@features/tokens";
import { Login } from "@features/login";
import { ModalProvider } from "@context/modals";
import { Modals } from "@components/Modal";
import { DappProvider } from "@context/dapp";

function App() {
  return (
    <DappProvider>
      <ModalProvider>
        <BrowserRouter>
          <Modals />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Layout />}>
              <Route path="" element={<Dashboard />} />
              <Route path="add" element={<AddToken />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </DappProvider>
  );
}

export default App;
