import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuthContext } from "@context/auth";
import { useWallet } from "@hooks";

export const RequireAssignatedRole = ({
  children,
}: {
  children: ReactNode;
}) => {
  const location = useLocation();
  const { user } = useAuthContext();
  const { handleConnect } = useWallet();

  useEffect(() => {
    console.log("Require Auth effect");
  }, []);

  return children;
};
