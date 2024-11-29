import { Outlet } from "react-router-dom";

import { MainContainer, Navbar } from "./components";
import { useDappContext } from "@hooks";
import { twMerge } from "tailwind-merge";

export const Layout = () => {
  const { isProfessionalTheme } = useDappContext()

  const themeStyles = isProfessionalTheme ? "bg-gray-100" : "bg-layout"
  return (
    <div className={twMerge("w-full h-screen bg-center bg-no-repeat bg-cover", themeStyles)}>
      <div className="flex flex-col h-screen overflow-hidden text-white">
        <Navbar />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </div>
  );
};
