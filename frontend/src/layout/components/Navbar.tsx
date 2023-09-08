import { Logo } from "@components/Logo";

import { LoginOrAccountButton, NavItems } from "./";
import { DrawerMenuButton } from "./DrawerMenuButton";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between w-full text-xl font-semibold text-white z-1 glass-alt min-h-[40px] border-b-2 border-b-transparent">
      <DrawerMenuButton />
      <Logo type="navbar" />
      <NavItems />
      <LoginOrAccountButton />
    </header>
  );
};

export default Navbar;
