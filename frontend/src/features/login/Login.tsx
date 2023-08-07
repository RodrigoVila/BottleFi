import { Logo } from "@components/Logo";
import { AnimatedButton } from "@components/Buttons";
import { Icon } from "@components/Icon";
import { useLocalStorage, useWallet } from "@hooks";
import { useDappContext } from "@context/dapp";
import { useEffect } from "react";
import { DAPP_INITIAL_DATA, LOCAL_STORAGE_KEY } from "@constants";
import { getProvider } from "@utils/ethers";

export const Login = () => {
  const [localStorageData] = useLocalStorage(
    LOCAL_STORAGE_KEY,
    DAPP_INITIAL_DATA
  );

  const { setDappData } = useDappContext();
  const { connectWithBrowserWallet } = useWallet();

  // const navigate = useNavigate();
  // const { account } = useDappContext();

  useEffect(() => {
    const isBrowserWalletConnected = async () => {
      const provider = getProvider();
      const accounts = await provider?.listAccounts();
      if (accounts && accounts.length > 0) {
        const account = accounts[0];
        const data = {
          ...localStorageData,
          account: {
            ...localStorage.account,
            address: account,
          },
        };
        setDappData(data);
      }
    };
    isBrowserWalletConnected();
  }, []);

  useEffect(() => {
    localStorageData.account ?? setDappData(localStorageData);
  }, [localStorageData, setDappData]);

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
