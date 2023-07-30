//  
// import { useState, useEffect } from "react";
// import { SignClient } from "@walletconnect/sign-client";
// import { Web3Modal } from "@web3modal/standalone";
// import { parseAccount } from "@utils/parse";
// import { useDappContext } from "@context/dapp";

// const projectId = process.env.REACT_APP_WC_PROJECT_ID;
// const standaloneChains = ["eip155:5"];

// const web3Modal = new Web3Modal({ projectId, standaloneChains });

// export const useWalletConnect = () => {
//   const [signClient, setSignClient] = useState<typeof SignClient | null>(null);

//   const { setAccount, setWalletConnectProvider, walletConnectProvider } =
//     useDappContext();

//   const createClient = async () => {
//     try {
//       const client = await SignClient.init({ projectId });
//       setSignClient(client);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const onSessionConnect = async (session: any) => {
//     if (!session) throw Error("Session doesnt exist");
//     try {
//       setWalletConnectProvider(session);
//       const account = session.namespaces.eip155.accounts[0];
//       setAccount(account);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handleConnectToWC = async () => {
//     if (!signClient) throw Error("SignClient not created");
//     try {
//       const requiredNamespaces = {
//         eip155: {
//           chains: standaloneChains,
//           methods: ["eth_sendTransaction"],
//           events: ["connect", "disconnect"],
//         },
//       };

//       const { uri, approval } = await signClient.connect({
//         requiredNamespaces,
//       });

//       if (uri) {
//         web3Modal.openModal({ uri });
//         const sessionNamespace = await approval();
//         console.log("sessionNamespace", sessionNamespace);
//         onSessionConnect(sessionNamespace);
//         web3Modal.closeModal();
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handleDisconnectFromWC = async () => {
//     if (walletConnectProvider) {
//       try {
//         await walletConnectProvider.disconnect({
//           topic: walletConnectProvider.topic,
//           code: 6000,
//           message: "User disconnected",
//         });
//         reset();
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   };

//   const reset = () => {
//     setAccount(null);
//     setWalletConnectProvider(null);
//   };

//   useEffect(() => {
//     if (!signClient) {
//       createClient();
//     }
//   }, []);

//   return { signClient, handleConnectToWC, handleDisconnectFromWC };
// };

import React from 'react'

export const useWalletConnect = () => {
  return (
    <div>useWalletConnect</div>
  )
}

