import { useDashboardContext } from "@context/dashboard";
import { ActionItem } from "./ActionItem";

export const ActionList = () => {
  const { actions } = useDashboardContext();

  return (
    <div className="flex items-center justify-between w-full h-full gap-2 border-2 border-glass rounded-xl p-6">
      {actions.map((action) => (
        <ActionItem action={action}>{action.label}</ActionItem>
      ))}
    </div>
  );
};
