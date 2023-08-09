import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { useDashboardContext, selectedAction } from "@context/dashboard";

type ActionItemProps = {
  action: selectedAction;
  children: ReactNode;
  className?: string;
};

export const ActionItem = ({
  action,
  children,
  className,
}: ActionItemProps) => {
  const { hoveredAction, setSelectedAction, setHoveredAction } =
    useDashboardContext();

  const hoverBorderColor = hoveredAction && hoveredAction.hoverColor;

  const handleClick = () => setSelectedAction(action);
  const handleMouseEnter = () => setHoveredAction(action);
  const handleMouseLeave = () => setHoveredAction(null);

  return (
    <button
      className={twMerge(
        "h-full w-full rounded-2xl text-white glass text-xl font-semibold border-2 border-transparent transition-all duration-500",
        hoverBorderColor,
        className
      )}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};
