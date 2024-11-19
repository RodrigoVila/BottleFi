import { useEffect } from "react";
import { Navigate } from "react-router-dom";

import {
  useAuthContext,
  useDappContext,
  useLocalStorage,
  useModalContext,
  useWallet,
} from "@hooks";
import { LOCAL_STORAGE_KEY, supportedNetworkId } from "@constants";
import { ChainSwitchModal, RolesModal } from "@components/Modal";

import { Layout } from "./layout";

export const App = () => {
  const { user } = useAuthContext();
  const { getTokens } = useDappContext();
  const {
    closeAllModals,
    isChainSwitchModalOpen,
    setChainSwitchModalOpen,
    isRolesModalOpen,
    setRolesModalOpen,
  } = useModalContext();

  const [localStorage] = useLocalStorage(LOCAL_STORAGE_KEY);

  // To keep event listeners active
  useWallet();

  // Modal flow are handled by order importance
  useEffect(() => {
    // 1) User  is not authenticated. They will interact with handleConnect function
    // located at the "Connect" button in the navbar
    if (!user) return;

    // 2) If user is in the wrong network. Then they shouldn't interact with the app.
    // All modals are closed and ChainSwitch modal will open
    if (user.chainId !== supportedNetworkId) {
      closeAllModals();
      setChainSwitchModalOpen(true);
      return;
    }
    // 3) If user is not connected, they will interact with the "handleConnect" fn
    // from useWallet. That will update the necessary user context
    if (!user.address) return;

    // 4) User is logged in and using the correct network.
    // So we check if they have associated roles. If not, role creation modal opens
    if (!user.role) {
      setRolesModalOpen(true);
      return;
    }

    // 5) Finally, user has a role and is ready to interact with the app
    isChainSwitchModalOpen && setChainSwitchModalOpen(false);
    isRolesModalOpen && setRolesModalOpen(false);
    getTokens();

    //eslint-disable-next-line
  }, [user]);

  if (!localStorage?.isWalletConnected) return <Navigate to="/login" />;

  return (
    <>
      <Navigate to="/dashboard" />
      <ChainSwitchModal />
      <RolesModal />
      <Layout />
    </>
  );
};
