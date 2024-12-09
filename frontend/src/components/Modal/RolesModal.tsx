import { ChangeEvent, useEffect, useMemo, useState } from "react";

import { Modal } from ".";

import {
  useAuthContext,
  useDappContext,
  useModalContext,
  useRolesContract,
  useToastNotifications,
} from "@hooks";
import { GradientButton } from "@components/Buttons";
import { Dropdown, TextInput } from "@components/Inputs";
import { Option } from "@components/Inputs/Dropdown";
import { parseAccount } from "@utils/parse";

export const RolesModal = () => {
  const [selectedRole, setSelectedRole] = useState<Option | null>(null);
  const [roleData, setRoleData] = useState({ name: "", description: "" });
  const [isLoading, setLoading] = useState(false);

  const { name, description } = roleData;

  const { user, setUser } = useAuthContext();
  const { getTokens } = useDappContext();
  const { isRolesModalOpen, setRolesModalOpen } = useModalContext();
  const { register } = useRolesContract();
  const {
    showErrorNotification,
    showSuccessNotification,
    showWarningNotification,
  } = useToastNotifications();

  const address = useMemo(
    () => (user?.address ? parseAccount(user?.address) : ""),
    [user]
  );

  const options: Option[] = [
    {
      title: "supplier",
      description: "Suppliers can do any action: Mint, transfer, sell",
    },
    { title: "vendor", description: "Vendors can only sell and verify" },
  ];

  const clearInputs = () => {
    setSelectedRole(null);
    setRoleData({ name: "", description: "" });
  };
  const closeModal = () => setRolesModalOpen(false);

  const handleRoleChange = (role: Option) => {
    setSelectedRole(role);
  };

  const handleDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!selectedRole) {
      showWarningNotification("Please select a role");
      return;
    }
    if (!name || !description) {
      showWarningNotification("Name and description required");
      return;
    }


    setLoading(true);

    try {
      const role = await register(selectedRole.title, name, description);
      if (role !== undefined) {
        setUser((prev) => ({ ...prev, role, name }));
        showSuccessNotification(`${role} registered successfully!`);
        closeModal();
      }
    } catch (error) {
      showErrorNotification(
        "Register role error. Please try again later or check the console for more information."
      );
      console.error("Register role error: ", error);
    } finally {
      setLoading(false);
      clearInputs();
    }
  };

  // As this modal is being open/closed from other parts of the App
  // we clear the inputs before it can be used again
  useEffect(() => {
    clearInputs();
  }, []);

  useEffect(() => {
    if (user?.role) {
      getTokens();
      closeModal();
    }
    //eslint-disable-next-line
  }, [user]);

  return (
    <Modal
      isOpen={isRolesModalOpen}
      onClose={closeModal}
      bodyClassName="text-left p-8"
      disableOutsideClick
      withoutCloseButton
    >
      <div className="flex flex-col items-center gap-1">
        <h3 className="mx-4 text-3xl font-semibold text-center">Create role for account</h3>
        <h3 className="text-xl font-semibold text-center border-2 border-white px-4 rounded-full tracking-widest bg-slate-950">{address}</h3>
      </div>
      <label className="self-start -mb-4 font-semibold text-white">Role</label>
      <Dropdown
        options={options}
        selectedOption={selectedRole}
        onChange={handleRoleChange}
        className="py-[10px]"
      />
      <TextInput
        name="name"
        label="Name"
        value={name}
        onChange={handleDataChange}
      />
      <TextInput
        name="description"
        label="Description"
        value={description}
        onChange={handleDataChange}
      />

      <GradientButton onClick={handleSubmit} loading={isLoading}>
        Create
      </GradientButton>
    </Modal>
  );
};
