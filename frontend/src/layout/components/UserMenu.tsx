import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useAuthContext, useLocalStorage } from "@hooks";
import { Button } from "@components/Buttons";
import { parseAccount } from "@utils/parse";
import { LOCAL_STORAGE_KEY } from "@constants";
import { UserDataType } from "@types";

import { UserBalance } from "./UserBalance";

export const UserMenu = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const [localStorage] = useLocalStorage(LOCAL_STORAGE_KEY);

  const userData: UserDataType = user || localStorage;

  const toggleMenu = () => setMenuOpen((open) => !open);

  return userData?.address ? (
    <>
      <button
        className={twMerge("px-3 py-1 text-base font-marcellus bg-glass hover:text-green-400",
        isMenuOpen && "text-green-400")}
        onClick={toggleMenu}
      >
        {parseAccount(userData.address)}
      </button>
      {isMenuOpen ? (
        <div className="center flex-col gap-4 absolute p-4 pt-2 top-[55px] right-0 glass-alt">
          <UserBalance />
          <Button className="w-3/4 p-1">Logout</Button>
        </div>
      ) : null}
    </>
  ) : null;
};
