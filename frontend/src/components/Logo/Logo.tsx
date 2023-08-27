import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

type LogoProps = {
  type?: "login" | "navbar";
};

export const Logo = ({ type = "login" }: LogoProps) => {
  const isLogin = type === "login";
  const containerStyles = isLogin ? "flex-col" : "flex-row";
  const textStyles = isLogin ? "text-5xl" : "text-2xl";

  return (
    <div
      className={twMerge(
        "flex flex-1 items-center justify-start gap-1",
        containerStyles
      )}
    >
      <AiOutlineSafetyCertificate
        size={isLogin ? 72 : 30}
        className="text-pink-600"
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
