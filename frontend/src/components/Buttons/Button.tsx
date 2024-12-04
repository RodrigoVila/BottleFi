import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Spinner } from "@components/Spinner";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: ReactNode;
  className?: string;
};

export const Button = ({
  loading = false,
  children,
  className,
  ...rest
}: ButtonProps) => {
  const baseStyles =
    "flex justify-between items-center w-max border border-white my-1 mx-0 p-2 text-white cursor-pointer text-base hover:bg-white transition-all duration-300 hover:text-black";
  const loadingStyles = loading && "bg-slate-500 pointer-events-none";

  return (
    <button
      className={twMerge(baseStyles, loadingStyles, className)}
      disabled={rest.disabled || loading}
      {...rest}
    >
      <div className="flex items-center justify-center w-full">
        <p>{loading ? <Spinner /> : children}</p>
      </div>
    </button>
  );
};
