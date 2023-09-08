import { Outlet } from "react-router-dom";

import { useWallet } from "@hooks";
import { Modals } from "@components/Modal";

import { MainContainer, Navbar } from "./components";

export const Layout = () => {
  //This is being called here for event listeners
  useWallet();

  return (
    <>
      <Modals />
      <div className="w-full h-screen bg-center bg-no-repeat bg-cover bg-layout">
        <div className="flex flex-col h-screen overflow-hidden text-white">
          <Navbar />
          <MainContainer>
            <Outlet />
          </MainContainer>
        </div>
      </div>
    </>
  );
};
