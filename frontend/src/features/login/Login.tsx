import { Logo } from "@components/Logo";
import { AnimatedButton } from "@components/Buttons";
import { useLocalStorage, useWallet } from "@hooks";
import { useAuthContext } from "@context/auth";
import { useEffect } from "react";
import { USER_INITIAL_DATA, LOCAL_STORAGE_KEY } from "@constants";
import { getProvider } from "@utils/ethers";
import { UserDataType } from "@types";

export const Login = () => {
  const [localStorageData] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    USER_INITIAL_DATA
  );

  const { setUser } = useAuthContext();
  const { connectWithBrowserWallet } = useWallet();

  // const navigate = useNavigate();
  // const { account } = useAuthContext();

  useEffect(() => {
    const isBrowserWalletConnected = async () => {
      const provider = getProvider();
      const accounts = await provider?.listAccounts();
      if (accounts && accounts.length > 0) {
        const account = accounts[0];
        const user: UserDataType = {
          ...localStorageData,
          account: {
            ...localStorage.account,
            address: account,
          },
        };
        setUser(user);
      }
    };
    isBrowserWalletConnected();
  }, []);

  useEffect(() => {
    localStorageData.account ?? setUser(localStorageData);
  }, [localStorageData, setUser]);

  return (
    <div className="w-full h-screen bg-[url('./src/assets/bg.jpeg')] bg-center bg-no-repeat bg-cover">
      <div className="w-full h-full center bg-overlay">
        <div className="flex-col max-w-xl gap-5 center">
          <Logo />
          <p className="text-3xl font-bold text-center font-cormorant">
            <span className="font-bold gradient-text">Exclusive</span>{" "}
            certificates for each produced bottle.
          </p>
          <p className="text-2xl text-center font-lato">
            Avoid counterfeit and bring trust to your customers.
          </p>
          <div className="flex flex-col items-center justify-center gap-2">
            {/* <AnimatedButton onClick={toggleModal}>Web3 Login</AnimatedButton> */}
            <AnimatedButton onClick={connectWithBrowserWallet}>
              Connect with Browser Wallet
            </AnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
};
