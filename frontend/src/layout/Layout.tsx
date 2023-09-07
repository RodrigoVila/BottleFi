import { Outlet } from "react-router-dom";

import { Modals } from "@components/Modal";

import { MainContainer, Navbar } from "./components";

export const Layout = () => {
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
