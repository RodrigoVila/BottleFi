import { useEffect, useState } from "react";
import { create, IPFSHTTPClient } from "ipfs-http-client";

import { getInfuraAuthHeaders } from "@constants";
import { IPFSStorageData } from "@types";

import { useToastNotifications } from "./useToastNotifications";

export const useIPFS = () => {
  const [IPFS, setIPFS] = useState<IPFSHTTPClient | null>(null);

  const { showErrorNotification } = useToastNotifications();

  const authHeaders = getInfuraAuthHeaders();
  const infuraSubdomain = import.meta.env.VITE_INFURA_GATEWAY_SUBDOMAIN;

  const uploadDataToIPFS = async (
    rawData: IPFSStorageData | File
  ): Promise<string | undefined> => {
    if (!IPFS) {
      throw new Error("IPFS not available");
    }

    const data = rawData instanceof File ? rawData : JSON.stringify(rawData);

    try {
      const { path } = await IPFS.add(data);
      return path;
    } catch (error) {
      const errorMsg = `Error trying to upload data to IPFS: ${error}`;
      showErrorNotification(errorMsg);
      console.error(errorMsg);
    }
  };

  const getDataFromIPFS = async (
    path: string
  ): Promise<IPFSStorageData | undefined> => {
    if (!authHeaders || !infuraSubdomain) return;
    try {
      const response = await fetch(`${infuraSubdomain}/${path}`, {
        headers: { Authorization: authHeaders },
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error geting data from ipfs: ", error);
    }
  };

  useEffect(() => {
    if (!authHeaders) {
      showErrorNotification(
        "You need to set the ENV variables VITE_INFURA_IPFS_API_KEY and VITE_INFURA_IPFS_API_KEY_SECRET. Check Readme to understand how to get those values"
      );
      return;
    }
    if (!infuraSubdomain) {
      showErrorNotification(
        "You need to set the ENV variabe VITE_INFURA_GATEWAY_SUBDOMAIN. Check Readme to understand how to get those values"
      );
      return;
    }
    const init = async () => {
      const instance = create({
        url: "https://ipfs.infura.io:5001",
        protocol: "https",
        headers: { Authorization: authHeaders },
      });
      setIPFS(instance);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    uploadDataToIPFS,
    getDataFromIPFS,
  };
};
