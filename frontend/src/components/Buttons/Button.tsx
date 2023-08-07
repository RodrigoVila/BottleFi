import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Spinner } from "@components/Spinner";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: any;
  loading?: boolean;
  children: ReactNode;
  className?:string
};

export const Button = ({
  icon = null,
  loading = false,
  children,
  className,
  ...rest
}: ButtonProps) => {
  const baseStyles =
    "flex justify-between items-center border-none bg-[#722f37] rounded-md my-1 mx-0 p-2 text-white cursor-pointer text-base hover:bg-white transition-all duration-300 hover:text-black";
  const loadingStyles = loading && "bg-slate-500";
  const withIconStyles = icon ? "w-full" : "w-1/2";
  const withIconLabelContainerStyles = icon
    ? "justify-between"
    : "justify-center";

  return (
    <button
      className={twMerge(
        baseStyles,
        loadingStyles,
        withIconStyles,
        className
      )}
      disabled={rest.disabled || loading}
      {...rest}
    >
      <div
        className={twMerge(
          "w-full flex items-center",
          withIconLabelContainerStyles
        )}
      >
        <p>{loading ? "Loading" : children}</p>
        <div className="ml-5">{loading ? <Spinner /> : icon}</div>
      </div>
    </button>
  );
};
