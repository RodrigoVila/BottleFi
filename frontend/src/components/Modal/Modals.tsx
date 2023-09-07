import { ChainSwitchModal } from "./ChainSwitch";
import { DrawerModal } from "./Drawer";
import { QRModal } from "./QR";
import { RolesModal } from "./Roles";

export const Modals = () => {
  return (
    <>
      <ChainSwitchModal />
      <DrawerModal />
      <QRModal />
      <RolesModal />
    </>
  );
};
