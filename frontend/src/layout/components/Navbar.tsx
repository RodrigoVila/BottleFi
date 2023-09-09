import { Logo } from "@components/Logo";
import { NavItems } from "@components/NavItems";

import { DrawerMenuButton, UserData } from "./";

export const Navbar = () => {
  return (
    <header className="relative flex items-center justify-between w-full text-xl font-semibold text-white z-1 glass-alt h-[55px] border-b-2 border-b-transparent">
      <DrawerMenuButton />
      <Logo type="navbar" />
      <NavItems />
      <UserData />
    </header>
  );
};

export default Navbar;
