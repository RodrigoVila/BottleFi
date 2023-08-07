import { DashboardActionItem } from "./DashboardActionItem";

export const DashboardActions = () => {
  return (
    <div className="center flex-wrap gap-4">
      <DashboardActionItem>Create</DashboardActionItem>
      <DashboardActionItem>Invalidate</DashboardActionItem>
      <DashboardActionItem>Transfer</DashboardActionItem>
    </div>
  );
};
