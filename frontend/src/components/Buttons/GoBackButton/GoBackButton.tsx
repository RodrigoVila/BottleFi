import { ButtonHTMLAttributes } from "react";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

type GoBackButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  iconSize?: number
  iconColor?:string
};

export const GoBackButton = ({ className, iconSize = 25, iconColor = "white", ...rest }: GoBackButtonProps) => {
  return (
    <button className={twMerge("rounded-full overflow-hidden", className)} {...rest}>
      <BsFillArrowLeftCircleFill size={iconSize} color={iconColor}  />
    </button>
  );
};
