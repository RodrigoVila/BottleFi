import { Outlet } from "react-router-dom";

import { MainContainer, Navbar } from "./components";

export const Layout = () => {
  return (
    <div className="w-full h-screen bg-[url('./src/assets/sky-bg.jpeg')] bg-center bg-no-repeat bg-cover">
      <div className="flex flex-col h-screen overflow-hidden text-white">
        <Navbar />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </div>
  );
};
