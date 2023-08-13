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
              <Route path="/tokens/add" element={<AddToken />} />
              <Route path="/tokens/sell" element={<SellToken />} />
              <Route path="/tokens/transfer" element={<TransferToken />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </DappProvider>
  );
}

export default App;
