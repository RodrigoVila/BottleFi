import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type RadioInputProps = InputHTMLAttributes<HTMLInputElement> & {
    className?:string
};

export const RadioInput = ({

  children,
  className,
  ...rest
}: RadioInputProps) => {
  return (
    <label>
      <input
        type="radio"
        className={twMerge("mr-2", className)}
        {...rest}
      />
      {children}
    </label>
  );
};
