import { AnimatedContainer } from "@components/AnimatedContainer/AnimatedContainer";
import { useDashboardContext } from "@context/dashboard";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export const ActionDescription = () => {
  const [isNavigationActivate, setNavigationActive] = useState(false);

  const { activeAction } = useDashboardContext();

  const goToThisComponentURL = () => setNavigationActive(true);

  return activeAction ? (
    <>
      {isNavigationActivate && <Navigate to={activeAction.goToUrl} />}
      <AnimatedContainer onClick={goToThisComponentURL} bodyClassName="flex-col items-start p-6">
        <h1 className="text-xl">{activeAction.label}</h1>
        <p className=" text-base font-normal">{activeAction.description}</p>
      </AnimatedContainer>
    </>
  ) : null;
};
