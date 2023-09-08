import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useAuthContext, useLocalStorage, useWallet } from "@hooks";
import { Button } from "@components/Buttons";
import { parseAccount } from "@utils/parse";
import { LOCAL_STORAGE_KEY } from "@constants";
import { UserDataType } from "@types";

import { UserBalance } from "./UserBalance";

export const UserMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const [localStorage] = useLocalStorage(LOCAL_STORAGE_KEY);
  const { handleDisconnect } = useWallet();

  const userData: UserDataType = user || localStorage;

  const toggleMenu = () => setMenuOpen((open) => !open);

  return userData?.address ? (
    <>
      <button
        className={twMerge(
          "px-3 py-1 ml-3 sm:ml-0 text-base font-marcellus bg-glass hover:text-green-400",
          isMenuOpen && "text-green-400"
        )}
        onClick={toggleMenu}
      >
        {parseAccount(userData.address)}
      </button>
      {isMenuOpen ? (
        <div className="absolute right-0 flex-col gap-3 p-3 top-[51px] md:top-[55px] center glass-alt">
          <UserBalance />
          <Button className="w-3/4 p-1" onClick={handleDisconnect}>
            Logout
          </Button>
        </div>
      ) : null}
    </>
  ) : null;
};
