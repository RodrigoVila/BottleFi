import { AnimatedContainer } from "@components/AnimatedContainer/AnimatedContainer";
import { useDashboardContext } from "@context/dashboard";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const ActionDescription = () => {
  const [isNavigationActivate, setNavigationActive] = useState(false);

  const { selectedAction } = useDashboardContext();

  const goToThisComponentURL = () => setNavigationActive(true);

  return selectedAction ? (
    <>
      {isNavigationActivate && <Navigate to={selectedAction.goToUrl} />}
      <AnimatedContainer onClick={goToThisComponentURL} bodyClassName="flex-col items-start p-6">
        <h1 className="text-xl">{selectedAction.label}</h1>
        <p className=" text-base font-normal">{selectedAction.description}</p>
      </AnimatedContainer>
    </>
  ) : null;
};
