import { Modal } from "..";
import { useModalContext } from "@context/modals";
import { AnimatedButton } from "@components/Buttons";
import { ChangeEvent, useState } from "react";
import { useToastNotifications } from "@hooks";
import { useRolesContract } from "@hooks";
import { TextInput } from "@components/Inputs";
import { RadioInput } from "@components/Inputs/RadioInput";
import { Roles } from "@types";

export const RolesModal = () => {
  const [selectedRole, setSelectedRole] = useState<Roles | "">("");
  const [roleData, setRoleData] = useState({ name: "", description: "" });

  const { name, description } = roleData;

  const { register, getSupplier, getVendor } = useRolesContract();
  const { isRolesModalOpen, setRolesModalOpen } = useModalContext();
  const { showWarningNotification } = useToastNotifications();

  const closeModal = () => setRolesModalOpen(false);

  const handleSelectRole = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Roles;
    setSelectedRole(value);
  };

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!name || !description) {
      showWarningNotification("Please complete all inputs");
      return;
    }
    if (selectedRole === "") {
      showWarningNotification("Please select a role");
      return;
    }
    await register(selectedRole, name, description);
  };

  const getRole = async () => {
    const supplier = await getSupplier();
    const vendor = await getVendor();
    console.log({ supplier, vendor });
  };

  return (
    <Modal
      isOpen={isRolesModalOpen}
      onClose={closeModal}
      className="bg-overlay"
      bodyClassName="border-2 border-darkOverlay bg-black max-w-md text-left bg-blue-400"
      disableOutsideClick
    >
      <h3 className="text-3xl font-semibold text-center">
        Select a role to interact with this app
      </h3>
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <RadioInput
          name="role"
          value="Supplier"
          checked={selectedRole === "Supplier"}
          onChange={handleSelectRole}
        >
          <b className="text-lg">Supplier</b> (Can create/transfer/sell tokens)
          *Recommended for testing the app
        </RadioInput>

        <RadioInput
          name="role"
          value="Vendor"
          checked={selectedRole === "Vendor"}
          onChange={handleSelectRole}
        >
          <b className="text-lg">Vendor</b> (Only can sell tokens)
        </RadioInput>
      </div>

      <TextInput
        name="name"
        label={`${selectedRole} Name`}
        value={name}
        onChange={handleDataChange}
      />
      <TextInput
        name="description"
        label={`${selectedRole} Description`}
        value={description}
        onChange={handleDataChange}
      />

      <AnimatedButton onClick={handleSubmit}>Submit</AnimatedButton>
      <AnimatedButton onClick={getRole}>getRole</AnimatedButton>
    </Modal>
  );
};
