import { twMerge } from "tailwind-merge";

import { useThemeContext } from "@hooks";

type DividerType = {
  type?: "horizontal" | "vertical";
  className?: string;
};

export const Divider = ({ type = "horizontal", className }: DividerType) => {
  const { isProfessionalTheme } = useThemeContext();

  const typeStyles =
    type === "horizontal" ? "h-[1px] md:my-2 w-full" : "w-[1px] mx-2 h-full";
  const themeStyles = isProfessionalTheme ? "bg-slate-700" : "bg-glass";

  return (
    <div className={twMerge("flex-none", typeStyles, themeStyles, className)} />
  );
};
