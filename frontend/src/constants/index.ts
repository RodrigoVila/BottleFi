type MetamaskPossibleErrors = {
  [key: string]: {
    standard: string;
    message: string;
  };
};

export const SEPOLIA_NETWORK_ID = 11155111;
export const HARDHAT_NETWORK_ID = 31337;

export const supportedNetworkId = import.meta.env.DEV
  ? HARDHAT_NETWORK_ID
  : SEPOLIA_NETWORK_ID;

export const supportedNetworkName = import.meta.env.DEV
  ? "Hardhat local network"
  : "Sepolia network";

export const LOCAL_STORAGE_KEY = "@BF_DATA";

const projectId = import.meta.env.VITE_INFURA_API_KEY;
const projectSecret = import.meta.env.VITE_INFURA_API_KEY_SECRET;

export const infuraAuthHeaders =
  "Basic " + btoa(projectId + ":" + projectSecret);

export const METAMASK_POSSIBLE_ERRORS: MetamaskPossibleErrors = {
  "-32700": {
    standard: "JSON RPC 2.0",
    message:
      "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
  },
  "-32600": {
    standard: "JSON RPC 2.0",
    message: "The JSON sent is not a valid Request object.",
  },
  "-32601": {
    standard: "JSON RPC 2.0",
    message: "The method does not exist / is not available.",
  },
  "-32602": {
    standard: "JSON RPC 2.0",
    message: "Invalid method parameter(s).",
  },
  "-32603": {
    standard: "JSON RPC 2.0",
    message: "Internal JSON-RPC error.",
  },
  "-32000": {
    standard: "EIP-1474",
    message: "Invalid input.",
  },
  "-32001": {
    standard: "EIP-1474",
    message: "Resource not found.",
  },
  "-32002": {
    standard: "EIP-1474",
    message:
      "Resource unavailable. Check if your wallet has a pending transaction.",
  },
  "-32003": {
    standard: "EIP-1474",
    message: "Transaction rejected.",
  },
  "-32004": {
    standard: "EIP-1474",
    message: "Method not supported.",
  },
  "-32005": {
    standard: "EIP-1474",
    message: "Request limit exceeded.",
  },
  "4001": {
    standard: "EIP-1193",
    message: "User rejected the request.",
  },
  "4100": {
    standard: "EIP-1193",
    message:
      "The requested account and/or method has not been authorized by the user.",
  },
  "4200": {
    standard: "EIP-1193",
    message: "The requested method is not supported by this Ethereum provider.",
  },
  "4900": {
    standard: "EIP-1193",
    message: "The provider is disconnected from all chains.",
  },
  "4901": {
    standard: "EIP-1193",
    message: "The provider is disconnected from the specified chain.",
  },
};
