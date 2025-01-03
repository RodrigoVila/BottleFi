import { twMerge } from "tailwind-merge";

import { useAuthContext, useThemeContext, useWallet } from "@hooks";
import { Button } from "@components/Buttons";
import { Logo } from "@components/Logo";
import { BurgerMenu, UserMenu } from "@components/Menues";
import { NavItems } from "@components/NavItems";

export const Navbar = () => {
  const { user } = useAuthContext();
  const { handleConnect } = useWallet();
  const { isProfessionalTheme } = useThemeContext();

  const themeStyles = isProfessionalTheme
    ? "bg-slate-800 text-slate-100"
    : "glass-alt text-white";

  return (
    <header
      className={twMerge(
        "relative flex items-center justify-between w-full text-xl font-semibold text-white h-[55px] border-b-2 border-b-transparent px-2",
        themeStyles
      )}
    >
      <BurgerMenu />
      <Logo type="navbar" />
      <NavItems />
      <div className="flex justify-end flex-1">
        {user?.address ? (
          <UserMenu address={user.address} />
        ) : (
          <Button className="!text-base lg:px-4" onClick={handleConnect}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
