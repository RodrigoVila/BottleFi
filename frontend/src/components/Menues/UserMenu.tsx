import { useState } from "react";
import { FaUserAstronaut,FaRegUser } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

import { useThemeContext, useWallet } from "@hooks";
import { Button } from "@components/Buttons";
import {
  FloatingMenu,
  FloatingMenuContent,
  FloatingMenuTrigger,
} from "@components/Menues/FloatingMenu";
import { parseAccount } from "@utils/parse";
import { ThemeToggle } from "@components/Inputs/ThemeToggle";
import { Divider } from "@features/tokens/layout";
import { UserBalance } from "@layout/components/UserBalance";

export const UserMenu = ({ address }: { address: string }) => {
  const [isOpen, setOpen] = useState(false);

  const { isProfessionalTheme } = useThemeContext()
  const { handleDisconnect } = useWallet();

  const themeStyles = isProfessionalTheme ? "bg-slate-800 border-slate-900 shadow-xl" : "glass-alt"
  const iconStyles = "w-6 h-6 cursor-pointer lg:hidden hover:text-white"

  const toggle = () => setOpen((open) => !open);

  return (
    <div className="flex justify-end flex-1 mr-2">
      <FloatingMenu open={isOpen} onOpenChange={setOpen}>
        <FloatingMenuTrigger onClick={toggle}>
          <>
            {/* Mobile: User Icon as a Menu button */}
            {isProfessionalTheme ? <FaRegUser className={iconStyles} /> : <FaUserAstronaut className={iconStyles} />}

            {/* Tablet onwards: User Address as a Menu button */}
            <div
              className={twMerge(
                "hidden lg:block py-1 px-3 ml-3 sm:ml-0 text-base font-marcellus w-max bg-transparent",
                isOpen && "text-black bg-white"
              )}
            >
              {parseAccount(address)}
            </div>
          </>
        </FloatingMenuTrigger>
        <FloatingMenuContent className={twMerge("p-4 border-0 z-[1] gap-4 mt-2 ml-2 flex flex-col", themeStyles)}>
          <UserBalance />
          <Divider type="horizontal" className="md:my-0" />
          <ThemeToggle />
          <Divider type="horizontal" className="md:my-0" />
          <Button className="px-6 py-1" onClick={handleDisconnect}>
            Logout
          </Button>
        </FloatingMenuContent>
      </FloatingMenu>
    </div>
  );
};
