import { useEffect, useState } from "react";
import { create, IPFSHTTPClient } from "ipfs-http-client";

import { infuraAuthHeaders } from "@constants";
import { IPFSStorageData } from "@types";

export const useIPFS = () => {
  const [IPFS, setIPFS] = useState<IPFSHTTPClient | null>(null);

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
      console.error("Error trying to upload data to IPFS: ", error);
    }
  };

  const getDataFromIPFS = async (
    path: string
  ): Promise<IPFSStorageData | undefined> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_INFURA_GATEWAY_SUBDOMAIN}/${path}`,
        { headers: { Authorization: infuraAuthHeaders } }
      );

      const json = await response.json();

      return json;
    } catch (error) {
      console.error("Error geting data from ipfs: ", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      const instance = create({
        url: "https://ipfs.infura.io:5001",
        protocol: "https",
        headers: { authorization: infuraAuthHeaders },
      });
      setIPFS(instance);
    };
    init();
  }, []);

  return {
    uploadDataToIPFS,
    getDataFromIPFS,
  };
};
