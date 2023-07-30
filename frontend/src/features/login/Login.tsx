import { useState } from "react";

import { useDappContext } from "@context/dapp";

import { Button } from "@components/Button";
import { WalletModal } from "@components/Modal";
import { Logo } from "@components/Logo";
import { GradientButton } from "@components/GradientButton";

export const Login = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  // const navigate = useNavigate();
  const { account } = useDappContext();

  const toggleModal = () => setModalOpen(!isModalOpen);

  // useEffect(() => {
  //   account && navigate("/dashboard");
  // }, [account]);

  return (
    <>
      <WalletModal isOpen={isModalOpen} toggleModal={toggleModal} />

      <div className="w-full h-screen flex items-center justify-center px-2 bg-[url('./src/assets/bg.jpeg')] bg-center bg-no-repeat bg-cover">
        <div className="flex flex-col items-center gap-6 bg px-2 pt-5 pb-2 rounded-2xl border-2 border-darkOverlay bg-overlay max-w-lg">
          <Logo />
          <p className="text-center text-3xl">
            Exclusive certificates for each produced bottle.
          </p>
          <p className="text-center text-2xl">
            Avoid counterfeit and bring trust to your customers.
          </p>
          <div className="flex items-center justify-center flex-col gap-3 w-3/4">
            <GradientButton onClick={toggleModal}>Web3 Login</GradientButton>
            <GradientButton>
              Web2 Login with Google*
            </GradientButton>
          </div>
          <p className="text-center text-sm font-semibold">
            *Simulation of transactions will be performed in order to test the
            app but operations won't be registered in the Blockchain.
          </p>
          {/* <Button onClick={toggleModal}>Connect Wallet</Button> */}
        </div>
      </div>
    </>
  );
};
