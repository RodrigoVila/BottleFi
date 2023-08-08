import { GoBackButton } from "@components/Buttons";
import { useDashboardContext } from "@context/dashboard";
import { twMerge } from "tailwind-merge";
import { ActionList } from "./ActionList";
import { ActionDescription } from "./ActionDescription";

export const DashboardActions = () => {
  const { activeAction, setActiveAction } = useDashboardContext();

  const activeStyles = activeAction ? "justify-start" : "justify-between";

  const goBack = () => setActiveAction(null);

  return (
    <section className="px-8">
      <h6 className="text-lg ml-2">{activeAction ? "Description" : "Actions"}</h6>
      <div className="h-36 relative">
        {activeAction && (
          <GoBackButton
            onClick={goBack}
            className="absolute top-1/2 -translate-y-1/2 -left-8 center"
          />
        )}
        {activeAction ? <ActionDescription /> : <ActionList />}
      </div>
    </section>
  );
};
