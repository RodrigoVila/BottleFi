import { Logo } from "@components/Logo";
import { AccountData } from "./";

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between w-full py-1 text-xl font-semibold text-white z-1">
      <Logo type="navbar" />
      <AccountData />
    </header>
  );
};

export default Navbar;
