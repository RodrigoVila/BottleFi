import { useEffect, useState } from "react";

import { useWallet } from "@hooks";
import { GradientButton } from "@components/Buttons";

import { UserMenu } from "./UserMenu";

export const UserData = () => {
  const [isConnected, setIsConnected] = useState(false);

  const { isWalletConnected, handleConnect } = useWallet();

  useEffect(() => {
    const getWalletConnection = async () => {
      try {
        const connected = await isWalletConnected();
        setIsConnected(connected);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    getWalletConnection();
    //eslint-disable-next-line
  }, []);

  return isConnected ? (
    <div className="flex justify-end flex-1 mr-3">
      <UserMenu />
    </div>
  ) : (
    <>
    adsdasdsdasd
    <GradientButton onClick={handleConnect}>Login</GradientButton>
    </>
  );
};
