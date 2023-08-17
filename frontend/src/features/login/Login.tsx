import { Logo } from "@components/Logo";
import { AnimatedButton } from "@components/Buttons";
import { useLocalStorage, useWallet } from "@hooks";
import { useAuthContext } from "@context/auth";
import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "@constants";
import { getProvider } from "@utils/ethers";
import { UserDataType } from "@types";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const [localStorageData] = useLocalStorage(LOCAL_STORAGE_KEY);

  const { user, setUser } = useAuthContext();
  const { handleConnect } = useWallet();

  useEffect(() => {
    localStorageData && setUser(localStorageData);
  }, [localStorageData]);

  useEffect(() => {
    console.log("Login user", user);
  }, [user]);

  return (
    <>
      {user && <Navigate to="/dashboard" />}
      <div className="w-full h-screen bg-[url('./src/assets/bg.jpeg')] bg-center bg-no-repeat bg-cover">
        <div className="w-full h-full center bg-overlay">
          <div className="flex-col max-w-xl gap-5 center">
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
