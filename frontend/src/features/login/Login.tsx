import { useState } from "react";

import { useDappContext } from "@context/dapp";

import { Button } from "@components/Button";
import { WalletModal } from "@components/Modal";
import { Logo } from "@components/Logo";
import { GradientButton } from "@components/GradientButton";
import { BorderColor } from "@components/BorderColor/BorderColor";

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
        <div className="flex flex-col items-center gap-6 bg px-3 pt-5 pb-2 rounded-2xl  bg-overlay max-w-lg">
          <Logo />
          <p className="text-center text-3xl font-cormorant font-bold">
            <span className="gradient-text font-bold">Exclusive</span> certificates for each produced bottle.
          </p>
          <p className="text-center text-2xl font-lato">
            Avoid counterfeit and bring trust to your customers.
          </p>
          <div className="flex items-center justify-center flex-col gap-3 w-3/4">
            <GradientButton onClick={toggleModal}>Web3 Login</GradientButton>
            <GradientButton>Login with Google*</GradientButton>
          </div>
          <p className="text-center text-sm font-semibold">
            *Operation will be simulated as if interacting with a Blockchain.
            But transactions won't be registered.
          </p>
          {/* <Button onClick={toggleModal}>Connect Wallet</Button> */}
        </div>
      </div>
    </>
  );
};
