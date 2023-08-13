import { GoButton } from "@components/Buttons";
import { useDashboardContext } from "@context/dashboard";
import { ActionList } from "./ActionList";
import { ActionDescription } from "./ActionDescription";

export const DashboardActions = () => {
  const { selectedAction, setSelectedAction } = useDashboardContext();

  const goBack = () => setSelectedAction(null);

  return (
    <section className="px-8">
      <h6 className="text-lg ml-2">
        {selectedAction ? "Description" : "Actions"}
      </h6>
      <div className="h-36 relative">
        {selectedAction && (
          <GoButton
            type="back"
            onClick={goBack}
            className="absolute top-1/2 -translate-y-1/2 -left-8 center"
          />
        )}
        {selectedAction ? <ActionDescription /> : <ActionList />}
      </div>
    </section>
  );
};
