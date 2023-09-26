import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useAuthContext, useWallet } from "@hooks";
import { AnimatedButton, Button } from "@components/Buttons";
import { getBalance } from "@utils/ethers";
import { parseAccount } from "@utils/parse";

import { UserBalance } from "./UserBalance";

export const UserMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

  const { user } = useAuthContext();
  const { handleConnect, handleDisconnect } = useWallet();

  const toggleMenu = () => setMenuOpen((open) => !open);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const balance = await getBalance();
        if (balance) setBalance(balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex justify-end flex-1 mr-2">
      {user?.address ? (
        <>
          <Button
            className={twMerge(
              "py-1 px-3 ml-3 sm:ml-0 text-base font-marcellus w-max text-glass-3 bg-transparent",
              isMenuOpen && "text-black bg-white"
            )}
            onClick={toggleMenu}
          >
            {parseAccount(user.address)}
          </Button>
          {isMenuOpen && (
            <div className="absolute right-0 flex-col gap-3 p-3 top-[51px] md:top-[55px] center glass-alt">
              <UserBalance balance={balance} />
              <p
                className="w-full p-1 text-base text-center cursor-pointer"
                onClick={handleDisconnect}
              >
                Logout
              </p>
            </div>
          )}
        </>
      ) : (
        <AnimatedButton className="!text-base md:px-4" onClick={handleConnect}>Login</AnimatedButton>
      )}
    </div>
  );
};
