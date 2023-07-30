import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DappProvider } from "@context/dapp";
import { StylesProvider } from "@context/styles";

import { Layout } from "@layout";
import { Dashboard } from "@features/dashboard";
import { AddToken } from "@features/tokens";
import { Login } from "@features/login";

function App() {
  return (
    <DappProvider>
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
    </DappProvider>
  );
}

export default App;
