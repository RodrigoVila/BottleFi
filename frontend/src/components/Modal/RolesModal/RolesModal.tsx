import { Modal } from "..";
import { useModalContext } from "@context/modals";
import { connectToSepoliaNetwork } from "@utils/ethers";
import { AnimatedButton } from "@components/Buttons";
import { useState } from "react";
import { useToastNotifications } from "@hooks";
import { useRolesContract } from "@hooks";

type Roles = "Supplier" | "Vendor";

export const RolesModal = () => {
  const [selectedRole, setSelectedRole] = useState<Roles | null>("Supplier");

  const { isRolesModalOpen, setRolesModalOpen } = useModalContext();

  const { showInfoNotification } = useToastNotifications();
  const { registerSupplier, getSupplier } = useRolesContract();

  const closeModal = () => setRolesModalOpen(false);

  const handleSubmit = async () => {
    if (selectedRole === null) {
      showInfoNotification("Please select a role");
      return;
    } else if (selectedRole === "Supplier") {
      await registerSupplier("pepe", "potamo");
    } else {
      ("");
    }
  };

  const getRole = async () => {
    const supp = await getSupplier();
    console.log({ supp });
  };

  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      className="bg-overlay"
      bodyClassName="border-2 border-darkOverlay bg-black max-w-md"
      disableOutsideClick
    >
      <h3 className="text-3xl font-semibold">
        Select a role to interact with this app
      </h3>
      <h5 className="text-lg">
        Supplier: Mint/create, transfer, sell/invalidate tokens * Recommended
        for testing the app
      </h5>
      <h5 className="text-lg">Vendor: Sell/invalidate tokens</h5>
      <AnimatedButton onClick={handleSubmit}>Submit</AnimatedButton>
      <AnimatedButton onClick={getRole}>getRole</AnimatedButton>
    </Modal>
  );
};
