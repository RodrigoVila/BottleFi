import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
  type?: string;
};

export const TextInput = ({
  label,
  className,
  type = "text",
  ...rest
}: TextInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={label} className="text-white font-semibold">
          {label}
        </label>
      )}
      <div className="p-px rounded-md bg-gradient">
      <input
        id={label}
        type={type}
        className={twMerge(
          "bg-black w-full p-1 rounded-md",
          className
        )}
        {...rest}
      />
      </div>
    </div>
  );
};
