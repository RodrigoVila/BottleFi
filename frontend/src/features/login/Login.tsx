import { Navigate } from "react-router-dom";

import { useAuthContext } from "@context/auth";
import { useWallet } from "@hooks";
import { AnimatedButton } from "@components/Buttons";
import { Logo } from "@components/Logo";

export const Login = () => {
  const { user } = useAuthContext();
  const { handleConnect } = useWallet();

  return (
    <>
      {user && <Navigate to="/dashboard" />}
      <div className="w-full h-screen bg-center bg-no-repeat bg-cover bg-login">
        <div className="w-full h-full center bg-overlay">
          <div className="flex-col max-w-xl gap-5 mx-2 center md:mx-0">
            <Logo />
            <p className="text-3xl font-bold text-center font-cormorant">
              <span className="font-bold gradient-text">Exclusive</span>{" "}
              certificates for each produced bottle.
            </p>
            <p className="text-2xl text-center font-lato">
              Avoid counterfeit and bring trust to your customers.
            </p>
            <div className="flex flex-col items-center justify-center gap-2">
              {/* <AnimatedButton onClick={toggleModal}>Web3 Login</AnimatedButton> */}
              <AnimatedButton onClick={handleConnect}>
                Connect with Browser Wallet
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
