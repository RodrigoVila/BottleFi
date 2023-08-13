import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Layout } from "@layout";
import { Dashboard } from "@features/dashboard";
import { AddToken, SellToken, TransferToken } from "@features/tokens";
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
            <Route path="" element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add" element={<AddToken />} />
              <Route path="/sell" element={<SellToken />} />
              <Route path="/transfer" element={<TransferToken />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </DappProvider>
  );
}

export default App;
