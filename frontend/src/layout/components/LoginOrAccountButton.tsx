import { useEffect, useState } from "react";

import { useAuthContext, useLocalStorage, useWallet } from "@hooks";
import { GradientButton } from "@components/Buttons";
import { getBalance } from "@utils/ethers";
import { parseAccount } from "@utils/parse";
import { LOCAL_STORAGE_KEY } from "@constants";

export const LoginOrAccountButton = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [localStorage] = useLocalStorage(LOCAL_STORAGE_KEY);
  const { user } = useAuthContext();
  const { isWalletConnected, handleConnect } = useWallet();

  const userData = user || localStorage;
  console.log({ userData });
  useEffect(() => {
    const getWalletConnection = async () => {
      try {
        const connected = await isWalletConnected();
        setIsConnected(connected);

        const balance = await getBalance();
        if (balance) setBalance(balance);
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };

    getWalletConnection();
  }, []);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  useEffect(() => {
    console.log({ localStorage });
  }, [localStorage]);

  return isConnected ? (
    <div className="justify-end flex-1 pr-3 w-fit">
      {userData?.address ? (
        <div className="justify-end gap-3 center ">
          <div className="overflow-hidden text-xs border-2 rounded-xl border-glass center">
            <div className="flex py-[6px] px-3 text-center bg-glass">
              Balance
            </div>
            <div className="px-2">
              <span className="text-[10px]">{balance}</span>
            </div>
          </div>
          <span className="text-base font-marcellus">
            {parseAccount(userData.address)}
          </span>
        </div>
      ) : (
        <GradientButton onClick={handleConnect}>Login</GradientButton>
      )}
    </div>
  ) : (
    <GradientButton onClick={handleConnect}>Login</GradientButton>
  );
};
