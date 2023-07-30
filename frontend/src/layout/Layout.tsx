import { Outlet } from "react-router-dom";

import { Navbar, MainContainer, Sidebar } from "./components";

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen text-white overflow-hidden">
      <Navbar />
      <div className="flex w-full h-full">
        <Sidebar />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </div>
  );
};
