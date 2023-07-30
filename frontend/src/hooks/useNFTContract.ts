 
import { useState, useEffect } from "react";
import { Contract } from "ethers";

export const useNFTContract = (
  contractAddress: string,
  contractABI: any[],
  provider: any
) => {
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    const getContract = async () => {
      const contract = new Contract(contractAddress, contractABI, provider);
      setContract(contract);
    };
    getContract();
  }, [contractAddress, contractABI, provider]);

  return contract;
};
