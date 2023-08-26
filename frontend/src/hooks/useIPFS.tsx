import { ChangeEvent, useEffect, useState } from "react";
import { IPFSHTTPClient, create } from "ipfs-http-client";
import { useToastNotifications } from "./useToastNotifications";
import { readFileAsArrayBuffer } from "@utils/file";
import { parseCatchError } from "@utils/parse";

export const useIPFS = () => {
  const [IPFS, setIPFS] = useState<IPFSHTTPClient | null>(null);
  const [fileBuffer, setFileBuffer] = useState<Uint8Array | null>(null);
  const [tokenURI, setTokenURI] = useState<string | null>(null);

  const { showErrorNotification } = useToastNotifications();

  const handleFileSelect = async (file:File) => {
    if (!file) return;

    try {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const uint8Array = new Uint8Array(arrayBuffer);
      setFileBuffer(uint8Array);
    } catch (err) {
      const error = parseCatchError(err);
      showErrorNotification(`Error reading file: ${error}`);
    }
  };

  const uploadFileToIPFS = async (): Promise<string> => {
    if (!IPFS || !fileBuffer) {
      throw new Error("IPFS or file buffer not available");
    }

    try {
      const created = await IPFS.add(fileBuffer);
      const fileURI = `https://ipfs.infura.io/ipfs/${created.path}`;
      return fileURI;
    } catch (error) {
      throw new Error("An error occurred while uploading to IPFS");
    }
  };

  const uploadMetadataToIPFS = async (
    name: string,
    description: string,
    image: string
  ): Promise<string> => {
    if (!IPFS) {
      throw new Error("IPFS not available");
    }

    const metaObj = { name, description, image };
    const strObj = JSON.stringify(metaObj);

    try {
      const created = await IPFS.add(strObj);
      const tokenURI = `https://ipfs.infura.io/ipfs/${created.path}`;
      setTokenURI(tokenURI);
      return tokenURI;
    } catch (error) {
      throw new Error("An error occurred while uploading to IPFS");
    }
  };

  useEffect(() => {
    const projectId = import.meta.env.VITE_INFURA_API_KEY;
    const projectSecret = import.meta.env.VITE_INFURA_API_KEY_SECRET;
    const auth = "Basic " + btoa(projectId + ":" + projectSecret);

    const init = async () => {
      const instance = create({
        url: "https://ipfs.infura.io:5001",
        protocol: "https",
        headers: { authorization: auth },
      });
      setIPFS(instance);
    };
    init();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
  console.log("fff",fileBuffer)
  }, [fileBuffer])
  

  return {
    fileBuffer,
    tokenURI,
    handleFileSelect,
    uploadFileToIPFS,
    uploadMetadataToIPFS,
  };
};
