import { useState } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import { useWallet } from "@hooks";
import { Button } from "@components/Buttons";
import {
  FloatingMenu,
  FloatingMenuContent,
  FloatingMenuTrigger,
} from "@components/Menues/FloatingMenu";
import { parseAccount } from "@utils/parse";

export const UserMenu = ({ address }: { address: string }) => {
  const [isOpen, setOpen] = useState(false);

  const { handleDisconnect } = useWallet();

  const toggle = () => setOpen((open) => !open);

  return (
    <div className="flex justify-end flex-1 mr-2">
      <FloatingMenu open={isOpen} onOpenChange={setOpen}>
        <FloatingMenuTrigger onClick={toggle}>
          <>
            {/* Mobile: User Icon as a Menu button */}
            <FaUserAstronaut className="w-6 h-6 cursor-pointer lg:hidden hover:text-white" />
            {/* Tablet onwards: User Address as a Menu button */}
            <div
              className={twMerge(
                "hidden lg:block py-1 px-3 ml-3 sm:ml-0 text-base font-marcellus w-max text-glass-3 bg-transparent",
                isOpen && "text-black bg-white"
              )}
            >
              {parseAccount(address)}
            </div>
          </>
        </FloatingMenuTrigger>
        <FloatingMenuContent className="p-2 border-0 bg-slate-800">
          <Button className="px-6 py-1" onClick={handleDisconnect}>
            Logout
          </Button>
        </FloatingMenuContent>
      </FloatingMenu>
    </div>
  );
};
