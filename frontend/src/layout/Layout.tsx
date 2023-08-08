import { Outlet } from "react-router-dom";

import { Navbar, MainContainer, Sidebar } from "./components";

export const Layout = () => {
  return (
    <div className="w-full h-screen dashboardBg bg-cover">
      <div className="flex flex-col h-screen text-white overflow-hidden">
        <Navbar />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </div>
  );
};
