import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type DashboardActionItemProps = {
  children: ReactNode;
  className?: string;
};

export const DashboardActionItem = ({
  children,
  className,
}: DashboardActionItemProps) => {
  return (
    <button
      className={twMerge(
        "h-48 w-48 rounded-2xl bg-lightOverlay center text-white hover:bg-darkOverlay",
        className
      )}
    >
      {children}
    </button>
  );
};
