import { twMerge } from "tailwind-merge";

type DividerType = {
  type?: "horizontal" | "vertical";
};

export const Divider = ({ type = "horizontal" }: DividerType) => {
  const typeStyles = type === "horizontal" ? "h-[1px] md:my-4" : "w-[1px] mx-4";

  return <div className={twMerge("flex-none bg-glass", typeStyles)} />;
};
