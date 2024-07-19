import { FaWineBottle } from "react-icons/fa";
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
      data-testid="logo"
      className={twMerge(
        "flex items-start justify-center md:justify-start gap-1 flex-1",
        containerStyles
      )}
    >
      <FaWineBottle
        data-testid="Icon logo"
        size={type === "login" ? 40 : 25}
        className="text-white -rotate-45"
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
