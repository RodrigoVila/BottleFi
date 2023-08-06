import { Logo } from "@components/Logo";
import { GradientButton } from "@components/GradientButton";
import { Icon } from "@components/Icon";
import { useWallet } from "@hooks";

export const Login = () => {
  const { connectWithBrowserWallet } = useWallet();
  // const navigate = useNavigate();
  // const { account } = useDappContext();

  // useEffect(() => {
  //   account && navigate("/dashboard");
  // }, [account]);

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
            {/* <GradientButton onClick={toggleModal}>Web3 Login</GradientButton> */}
            <GradientButton
              icon={
                <Icon src="/src/assets/metamaskLogo.png" alt="Metamask Logo" />
              }
              onClick={() => connectWithBrowserWallet("metamask")}
            >
              Metamask
            </GradientButton>
            <GradientButton
              icon={
                <Icon src="/src/assets/coinbaseLogo.png" alt="Coinbase Logo" />
              }
              onClick={() => connectWithBrowserWallet("coinbase")}
            >
              Coinbase
            </GradientButton>
            <GradientButton>Login with Google*</GradientButton>
          </div>
          <p className="text-sm font-semibold text-center">
            *Operation will be simulated as if interacting with a Blockchain.
            But transactions won't be registered.
          </p>
          {/* <Button onClick={toggleModal}>Connect Wallet</Button> */}
        </div>
      </div>
    </div>
  );
};
