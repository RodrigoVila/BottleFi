import { ButtonHTMLAttributes } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsArrowLeft } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

type GoButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "className"
> & {
  type: "back" | "next";
  className?: string;
  iconSize?: number;
  iconColor?: string;
};

export const GoButton = ({
  type,
  className,
  iconSize = 25,
  iconColor = "white",
  ...rest
}: GoButtonProps) => {
  return (
    <button
      className={twMerge("rounded-full overflow-hidden", className)}
      {...rest}
    >
      {type === "back" ? (
        <BsFillArrowLeftCircleFill size={iconSize} color={iconColor} />
      ) : (
        <BsFillArrowRightCircleFill size={iconSize} color={iconColor} />
      )}
    </button>
  );
};
