import { twJoin } from "tailwind-merge";

import { TokenValidity } from ".";

import { useThemeContext } from "@hooks";

export const MobileTokenValidity = () => {
  const { isProfessionalTheme } = useThemeContext();

  const themeStyles = isProfessionalTheme ? "bg-slate-900" : "";

  return (
    <div
      className={twJoin(
        "w-full h-full min-h-screen bg-center bg-no-repeat bg-cover",
        themeStyles
      )}
    >
      <div className="min-h-screen flex items-center justify-center center my-16 lg:my-0">
        <TokenValidity />
      </div>
    </div>
  );
};
