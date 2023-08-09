import { useDashboardContext } from "@context/dashboard";
import { ActionItem } from "./ActionItem";
import { twMerge } from "tailwind-merge";

export const ActionList = () => {
  const { actions, hoveredAction } = useDashboardContext();

  const borderColor = hoveredAction ? hoveredAction.borderColor : "border-glass";

  return (
    <div
      className={twMerge(
        "flex items-center justify-between w-full h-full gap-2 border-2 rounded-xl p-6 transition-all duration-500",
        borderColor
      )}
    >
      {actions.map((action) => (
        <ActionItem key={action.label} action={action}>
          {action.label}
        </ActionItem>
      ))}
    </div>
  );
};
