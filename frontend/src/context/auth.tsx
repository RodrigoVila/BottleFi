import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { UserDataType } from "@types";

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: UserDataType | null;
  setUser: Dispatch<SetStateAction<UserDataType | null>>;
};

const initialValue: AuthContextType = {
  user: null,
  setUser: () => {},
};

const AuthContext = createContext<AuthContextType>(initialValue);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState(initialValue.user);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};
