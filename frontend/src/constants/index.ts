import { UserDataType } from "@types";

export const SEPOLIA_NETWORK_ID = 11155111;

export const LOCAL_STORAGE_KEY = "@BF_DATA";

export const USER_INITIAL_DATA: UserDataType = {
  account: {
    address: null,
    name: null,
    type: null,
  },
  chainId: null,
  signer: null
};
