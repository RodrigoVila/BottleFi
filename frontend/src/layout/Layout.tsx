import { Outlet } from "react-router-dom";

import { Navbar, MainContainer, Sidebar } from "./components";
import { useEffect } from "react";
import { useAuthContext } from "@context/auth";

export const Layout = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    console.log("layout user", user);
  }, []);

  return (
    <div className="w-full h-screen bg-cover dashboardBg">
      <div className="flex flex-col h-screen overflow-hidden text-white">
        <Navbar />
        <div className="flex h-full mb-2 mr-2 xl:mr-4 xl:mb-4">
          <Sidebar />
          <MainContainer>
            <Outlet />
          </MainContainer>
        </div>
      </div>
    </div>
  );
};
