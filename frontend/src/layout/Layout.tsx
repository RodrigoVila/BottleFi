import { Outlet } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useThemeContext } from "@hooks";

import { MainContainer, Navbar } from "./components";

export const Layout = () => {
  const { isProfessionalTheme } = useThemeContext()

  const themeStyles = isProfessionalTheme ? "bg-slate-900" : "bg-layout"
  return (
    <div className={twMerge("flex w-full min-h-screen bg-center bg-no-repeat bg-cover", themeStyles)}>
      <div className="flex flex-col overflow-hidden text-white flex-1">
        <Navbar />
        <MainContainer>
          <Outlet />
        </MainContainer>
      </div>
    </div>
  );
};
