export const SEPOLIA_NETWORK_ID = 11155111;
export const HARDHAT_LOCALHOST_ID = 31337;

export const LOCAL_STORAGE_KEY = "@BF_DATA";

const projectId = import.meta.env.VITE_INFURA_API_KEY;
const projectSecret = import.meta.env.VITE_INFURA_API_KEY_SECRET;

export const infuraAuthHeaders = "Basic " + btoa(projectId + ":" + projectSecret);

