import { Logo } from "@components/Logo";
import { CurrentPage, AccountData } from "./";

export const Navbar = () => {
  return (
    <header className="w-full py-1 text-xl font-semibold text-white z-1 center glass">
      <Logo />
      <CurrentPage />
      <AccountData />
    </header>
  );
};

export default Navbar;
