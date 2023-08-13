import { Outlet } from "react-router-dom";

import { Navbar, MainContainer, Sidebar } from "./components";

export const Layout = () => {
  return (
    <div className="w-full h-screen bg-cover dashboardBg">
      <div className="flex flex-col h-screen overflow-hidden text-white">
        <Navbar />
        <div className="flex h-full">
          <Sidebar />
          <MainContainer>
            <Outlet />
          </MainContainer>
        </div>
      </div>
    </div>
  );
};
