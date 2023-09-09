import { Navigate } from "react-router-dom";

import { useAuthContext, useWallet } from "@hooks";
import { AnimatedButton } from "@components/Buttons";
import { Logo } from "@components/Logo";

export const Login = () => {
  const { user } = useAuthContext();
  const { handleConnect } = useWallet();

  return (
    <>
      {user && <Navigate to="/dashboard" />}
      <div className="w-full h-screen bg-center bg-no-repeat bg-cover bg-login">
        <div className="w-full h-full center bg-overlay font-marcellus">
          <div className="flex-col max-w-xl gap-5 mx-2 center md:mx-0">
            <Logo />
            <p className="text-4xl text-center font-cormorant">
              <span className="font-bold gradient-text">Exclusive</span>{" "}
              certificates for each produced bottle.
            </p>
            <p className="text-3xl text-center">
              Avoid counterfeit and bring trust to your customers.
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              <AnimatedButton onClick={handleConnect}>
                Connect with wallet
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
