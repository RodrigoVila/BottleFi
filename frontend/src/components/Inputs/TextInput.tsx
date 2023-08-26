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
        <label htmlFor={label} className="font-semibold text-white">
          {label}
        </label>
      )}
      <input
        id={label}
        type={type}
        name={label?.toLowerCase()}
        className={twMerge(
          "border-glass border-2 bg-transparent w-full p-1 rounded-md focus:outline-none focus:border-white py-[6px]",
          className
        )}
        {...rest}
      />
    </div>
  );
};
