import { useModalContext } from "@hooks";
import { NavItems } from "@components/NavItems";

import { Modal } from "./Modal";

export const DrawerModal = () => {
  const { isDrawerModalOpen, setDrawerModalOpen } = useModalContext();

  const closeModal = () => setDrawerModalOpen(false);

  return (
    <Modal isOpen={isDrawerModalOpen} onClose={closeModal} bodyClassName="w-fit px-16" className="w-fit">
      <NavItems position="vertical" />
    </Modal>
  );
};
