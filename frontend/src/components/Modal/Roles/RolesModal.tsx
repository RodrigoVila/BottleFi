import { ChangeEvent, useState } from "react";
import { twMerge } from "tailwind-merge";

import {
  useAuthContext,
  useLocalStorage,
  useModalContext,
  useRolesContract,
  useToastNotifications,
} from "@hooks";
import { GradientButton } from "@components/Buttons";
import { TextInput } from "@components/Inputs";
import { RadioInput } from "@components/Inputs/RadioInput";
import { LOCAL_STORAGE_KEY } from "@constants";
import { Roles } from "@types";

import { Modal } from "..";

export const RolesModal = () => {
  const [selectedRole, setSelectedRole] = useState<Roles | null>(null);
  const [roleData, setRoleData] = useState({ name: "", description: "" });
  const [isRoleFocus, setRoleFocus] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { name, description } = roleData;

  const { setUser } = useAuthContext();
  const [, setLocalStorage] = useLocalStorage(LOCAL_STORAGE_KEY);
  const { isRolesModalOpen, setRolesModalOpen } = useModalContext();
  const { register } = useRolesContract();
  const {
    showErrorNotification,
    showSuccessNotification,
    showWarningNotification,
  } = useToastNotifications();

  const closeModal = () => setRolesModalOpen(false);

  const handleRoleChange = (value: Roles) => {
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
    if (!selectedRole) {
      showWarningNotification("Please select a role");
      return;
    }

    setLoading(true);

    try {
      const role = await register(selectedRole, name, description);
      if (role !== undefined) {
        setUser((prev) => {
          const currentUser = { ...prev, role, name };
          setLocalStorage(currentUser);
          return currentUser;
        });
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
    }
  };

  //This gives the same look n feel as when we focus/blur the other inputs
  const onFocusRole = () => setRoleFocus(true);
  const onBlurRole = () => setRoleFocus(false);
  const radioStyles = isRoleFocus ? "border-white" : "border-glass";

  return (
    <Modal
      isOpen={isRolesModalOpen}
      onClose={closeModal}
      bodyClassName="text-left p-8"
      disableOutsideClick
      withoutCloseButton
    >
      <h3 className="mx-4 text-3xl font-semibold text-center">Create a role</h3>
      <label className="self-start -mb-4 font-semibold text-white">Role</label>
      <div
        className={twMerge(
          "flex flex-col gap-3 px-2 py-3 border-2 max-w-fit rounded-md",
          radioStyles
        )}
        tabIndex={100}
        onFocus={onFocusRole}
        onBlur={onBlurRole}
      >
        <RadioInput
          name="role"
          id="supplier"
          value="Supplier"
          checked={selectedRole === "Supplier"}
          onChange={handleRoleChange}
        >
          <b className="text-lg">Supplier</b> (Can create/transfer/sell tokens)
          *Recommended for testing the app
        </RadioInput>

        <RadioInput
          name="role"
          id="supplier"
          value="Vendor"
          checked={selectedRole === "Vendor"}
          onChange={handleRoleChange}
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

      <GradientButton onClick={handleSubmit} loading={isLoading}>
        Create
      </GradientButton>
    </Modal>
  );
};
