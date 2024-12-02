import { useThemeContext } from "@hooks";
import { TokenValidity } from ".";
import { twJoin, twMerge } from "tailwind-merge";

export const MobileTokenValidity = () => {
  const {isProfessionalTheme} = useThemeContext()

  const themeStyles = isProfessionalTheme ? "bg-slate-900" : "bg-layout"

  return (
    <div className={twJoin("w-full h-full min-h-screen bg-center bg-no-repeat bg-cover bg-layout", themeStyles)}>
      <div className="h-full center my-16">
        <TokenValidity />
      </div>
    </div>
  );
};
