import { useEffect, useState } from "react";

import { useAuthContext } from "@context/auth";
import { LOCAL_STORAGE_KEY } from "@constants";
import { UserDataType } from "@types";

import { useLocalStorage } from "./useLocalStorage";

export const useDataStorage = () => {
  const [data, setData] = useState<UserDataType | null>(null);

  const { setUser } = useAuthContext();
  const [, setLocalStorage] = useLocalStorage(LOCAL_STORAGE_KEY);

  useEffect(() => {
    if (data) {
      const dataToStorage = { ...data };
      delete dataToStorage.signer;

      setUser(data);
      setLocalStorage(dataToStorage);
    }
  }, [data, setUser, setLocalStorage]);

  return { setData };
};
