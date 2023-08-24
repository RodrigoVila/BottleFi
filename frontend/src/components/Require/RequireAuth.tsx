import { ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { useAuthContext } from "@context/auth";
import { useWallet } from "@hooks";

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { user } = useAuthContext();
  const { handleConnect } = useWallet();

 useEffect(() => {
 console.log("Require Auth effect")
 }, [])

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
