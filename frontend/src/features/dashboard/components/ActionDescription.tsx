import { AnimatedContainer } from "@components/AnimatedContainer/AnimatedContainer";
import { GoButton } from "@components/Buttons";
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
      <AnimatedContainer
        onClick={goToThisComponentURL}
        bodyClassName="flex-col justify-center items-start p-6 cursor-pointer relative"
      >
        <h1 className="absolute top-3 text-xl">{selectedAction.label}</h1>
        <p className="text-base font-normal">{selectedAction.description}</p>
        <div className="absolute bottom-2 right-3 flex gap-2">
          <p className="font-bold">{`Go to ${selectedAction.label}`}</p>
          <GoButton type="next" />
        </div>
      </AnimatedContainer>
    </>
  ) : null;
};
