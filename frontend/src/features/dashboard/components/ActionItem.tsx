import { ReactNode, useState } from "react";
import { Navigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useDashboardContext, ActiveAction } from "@context/dashboard";

type ActionItemProps = {
  action: ActiveAction;
  children: ReactNode;
  className?: string;
};

export const ActionItem = ({
  action,
  children,
  className,
}: ActionItemProps) => {
  const { activeAction, setActiveAction } = useDashboardContext();

  const activeStyles = !activeAction
    ? "center" //If no item at all is selected
    : activeAction === action
    ? "" // It this item is selected
    : "hidden"; // If any other item is selected

  const handleClick = () => setActiveAction(action);

  return (
    <button
      className={twMerge(
        "h-full w-full rounded-2xl text-white glass text-xl font-semibold border-2 border-transparent hover:border-glass",
        activeStyles,
        className
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
