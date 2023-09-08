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
  }, []);

  return isConnected ? (
    <div className="justify-end flex-1 pr-3 w-fit">
      <div className="justify-end gap-3 center">
        <UserMenu />
      </div>
    </div>
  ) : (
    <GradientButton onClick={handleConnect}>Login</GradientButton>
  );
};
