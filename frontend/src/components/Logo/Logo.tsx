import { twMerge } from "tailwind-merge";
import { AiOutlineSafetyCertificate } from "react-icons/ai"

type LogoProps = {
  type?: "login" | "navbar";
};

export const Logo = ({ type = "login" }: LogoProps) => {
  const isLogin = type === "login";
  const containerStyles = isLogin ? "flex-col" : "flex-row";
  const imageStyles = isLogin ? "h-14 w-14" : "h-8 w-8";
  const textStyles = isLogin ? "text-5xl" : "text-2xl";

  return (
    <div
      className={twMerge(
        "flex flex-1 items-center justify-start gap-1",
        containerStyles
      )}
    >
      <AiOutlineSafetyCertificate size={isLogin ? 72 : 30} className="text-pink-600" />
      {/* <img
        src={"./src/assets/guaranteeIcon.png"}
        className={imageStyles}
        alt="BottleFi"
      /> */}
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
