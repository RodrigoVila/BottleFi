import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
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
    "flex justify-between items-center w-full bg-black border border-white my-1 mx-0 p-2 text-white cursor-pointer text-base hover:bg-white transition-all duration-300 hover:text-black";
  const loadingStyles = loading && "bg-slate-500 pointer-events-none";

  return (
    <button
      className={twMerge(baseStyles, loadingStyles, className)}
      disabled={rest.disabled || loading}
      {...rest}
    >
      <div className="flex items-center justify-center w-full">
        <p>{loading ? "Loading" : children}</p>
      </div>
    </button>
  );
};
