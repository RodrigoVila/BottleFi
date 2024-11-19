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
    <div className="flex flex-col w-full gap-2">
      {label && (
        <label htmlFor={label} className="hidden font-semibold text-white md:block">
          {label}
        </label>
      )}
      <input
        id={label}
        type={type}
        placeholder={label}
        name={label?.toLowerCase()}
        className={twMerge(
          "border-glass border-2 bg-transparent w-full p-1 pl-3 rounded-md focus:outline-none focus:border-white py-[6px] md:placeholder-transparent disabled:bg-gray-700",
          className
        )}
        {...rest}
      />
    </div>
  );
};
