import { useEffect, useState } from "react";
import { create, IPFSHTTPClient } from "ipfs-http-client";

import { infuraAuthHeaders } from "@constants";
import { IPFSStorageData } from "@types";

export const useIPFS = () => {
  const [IPFS, setIPFS] = useState<IPFSHTTPClient | null>(null);

  //Todo: Unify the upload to ipfs functions
  const uploadFileToIPFS = async (file: File): Promise<string | undefined> => {
    if (!IPFS) {
      throw new Error("IPFS not available");
    }
    try {
      const { path } = await IPFS.add(file);
      return path;
    } catch (error) {
      console.error("An error occurred while uploading to IPFS");
    }
  };

  const uploadMetadataToIPFS = async (
    data: IPFSStorageData
  ): Promise<string | undefined> => {
    if (!IPFS) {
      throw new Error("IPFS not available");
    }

    const strData = JSON.stringify(data);

    try {
      const { path } = await IPFS.add(strData);
      return path;
    } catch (error) {
      console.error("An error occurred while uploading to IPFS");
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
    } catch (e) {
      console.error("ERror geting data from ipfs: ", e);
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
    uploadFileToIPFS,
    uploadMetadataToIPFS,
    getDataFromIPFS,
  };
};
