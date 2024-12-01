import { useThemeContext } from "@hooks";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type TokenLayoutProps = {
  children: ReactNode;
  className?: string;
};

export const TokenLayout = ({ children, className }: TokenLayoutProps) => {
  const {isProfessionalTheme} = useThemeContext()

  const themeStyles = isProfessionalTheme ? "md:bg-slate-800 text-slate-100" : "glass-alt border-glass"
  return (
    <div
      className={twMerge(
        "w-full h-full md:h-fit flex flex-col md:rounded-xl items-stretch justify-center max-w-2xl p-6 text-white gap-2 max-w-lg",
        themeStyles,
        className
      )}
    >
      {children}
    </div>
  );
};
