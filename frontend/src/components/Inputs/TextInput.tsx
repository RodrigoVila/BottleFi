import { useDappContext } from "@hooks";
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
  const { isProfessionalTheme } = useDappContext()

  const themeStyles = isProfessionalTheme ? "border-gray-800 bg-white placeholder:text-gray-700" : "bg-transparent border-glass focus:border-white md:placeholder-transparent"

  return (
    <div className="flex flex-col w-full gap-2">
      {label && (
        <label htmlFor={label} className="hidden font-semibold md:block">
          {label}
        </label>
      )}
      <input
        id={label}
        type={type}
        placeholder={label}
        name={label?.toLowerCase()}
        className={twMerge(
          "border-2 w-full p-1 pl-3 rounded-md focus:outline-none py-[6px] disabled:bg-gray-700",
          themeStyles,
          className
        )}
        {...rest}
      />
    </div>
  );
};
