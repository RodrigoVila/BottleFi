import { VscVerifiedFilled } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

type LogoProps = {
  type?: "login" | "navbar";
};

export const Logo = ({ type = "login" }: LogoProps) => {
  const isLogin = type === "login";
  const containerStyles = isLogin ? "flex-col" : "flex-row ml-2";
  const textStyles = isLogin ? "text-5xl" : "text-2xl";

  return (
    <div
      className={twMerge(
        "flex items-center justify-center md:justify-start gap-1 flex-1",
        containerStyles
      )}
    >
      <VscVerifiedFilled size={type === "login" ? 62 : 30} className="text-red-700" />
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
