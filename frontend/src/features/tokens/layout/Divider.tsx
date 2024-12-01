import { useThemeContext } from "@hooks";
import { twMerge } from "tailwind-merge";

type DividerType = {
  type?: "horizontal" | "vertical";
  className?: string
};

export const Divider = ({ type = "horizontal", className }: DividerType) => {
  const { isProfessionalTheme } = useThemeContext()

  const typeStyles = type === "horizontal" ? "h-[1px] md:my-4" : "w-[1px] mx-4";
  const themeStyles = isProfessionalTheme ? "bg-slate-700" : "bg-glass"

  return <div className={twMerge("flex-none", typeStyles, themeStyles, className)} />;
};
