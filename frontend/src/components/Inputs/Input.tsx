import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
  type?: string;
};

export const Input = ({
  label,
  className,
  type = "text",
  ...rest
}: InputProps) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && (
        <label htmlFor={label} className="text-white font-semibold">
          {label}
        </label>
      )}
      <input
        id={label}
        type={type}
        className={twMerge(
          "p-1 pr-0 border-[1px] border-white rounded-md bg-black",
          className
        )}
        {...rest}
      />
    </div>
  );
};
