import { Outlet } from "react-router-dom";

import { MainContainer, Navbar } from "./components";
import { useThemeContext } from "@hooks";
import { twMerge } from "tailwind-merge";

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
