import { useEffect, useState } from "react";

import { useWallet } from "@hooks";
import { GradientButton } from "@components/Buttons";
import { isAccountConnected } from "@utils/ethers";

import { UserMenu } from "./UserMenu";

export const UserData = () => {
  const [isConnected, setIsConnected] = useState(false);

  const { handleConnect } = useWallet();

  useEffect(() => {
    const getWalletConnection = async () => {
      try {
        const connected = await isAccountConnected();
        setIsConnected(connected);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    getWalletConnection();
    //eslint-disable-next-line
  }, []);

  return isConnected ? (
    <div className="flex justify-end flex-1 mr-2">
      <UserMenu />
    </div>
  ) : (
    <div className="flex justify-end flex-1 mr-2">
      <GradientButton onClick={handleConnect} className="w-fit" bodyClassName="!px-2 text-sm">Login</GradientButton>
    </div>
  );
};
