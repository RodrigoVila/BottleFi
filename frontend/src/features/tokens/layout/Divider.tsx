import { useDappContext } from "@hooks";
import { twMerge } from "tailwind-merge";

type DividerType = {
  type?: "horizontal" | "vertical";
};

export const Divider = ({ type = "horizontal" }: DividerType) => {
  const { isProfessionalTheme } = useDappContext()

  const typeStyles = type === "horizontal" ? "h-[1px] md:my-4" : "w-[1px] mx-4";
  const themeStyles = isProfessionalTheme ? "bg-black" : "bg-glass"

  return <div className={twMerge("flex-none", typeStyles, themeStyles)} />;
};
