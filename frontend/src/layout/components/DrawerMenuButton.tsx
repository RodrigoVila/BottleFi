import { GiHamburgerMenu } from "react-icons/gi";

import { useModalContext } from "@context/modals";

export const DrawerMenuButton = () => {
  const { setDrawerModalOpen } = useModalContext();

  const openMenu = () => setDrawerModalOpen((prev) => !prev);

  return (
    <div className="flex-1 block pl-2 md:hidden">
      <GiHamburgerMenu size={20} onClick={openMenu} />
    </div>
  );
};
