import { Logo } from "@components/Logo";

import { AccountData, NavItems } from "./";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between w-full text-xl font-semibold text-white z-1 glass-alt min-h-[40px]">
      <Logo type="navbar" />
      <NavItems />
      <AccountData />
    </header>
  );
};

export default Navbar;
