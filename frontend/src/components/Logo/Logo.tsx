import { LiaCertificateSolid } from "react-icons/lia";
import { twMerge } from "tailwind-merge";

type LogoProps = {
  type?: "login" | "navbar";
};

export const Logo = ({ type = "login" }: LogoProps) => {
  const isLogin = type === "login";
  const containerStyles = !isLogin && "flex-row ml-2";
  const textStyles = isLogin ? "text-6xl md:text-7xl" : "text-2xl";

  return (
    <div
      data-testid="logo"
      className={twMerge(
        "flex items-center justify-center lg:justify-start gap-1 flex-1",
        containerStyles
      )}
    >
      <LiaCertificateSolid
        data-testid="Icon logo"
        size={30}
        className={twMerge("text-white", isLogin && 'hidden')}
      />
      <h1
        className={twMerge(
          "m-0 font-semibold leading-none font-fondamento",
          textStyles
        )}
      >
        BottleFi
      </h1>
    </div>
  );
};
