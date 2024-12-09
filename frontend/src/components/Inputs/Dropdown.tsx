import { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import { useThemeContext } from "@hooks";
import { Roles } from "@types";

export type Option = {
  title: Roles;
  description: string;
};

export type CustomDropDownProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "className"
> & {
  options: Option[];
  selectedOption: Option | null;
  className?: string;
  onChange: (option: Option) => void;
};

export const Dropdown = ({
  options,
  selectedOption,
  className = "",
  onChange,
  ...rest
}: CustomDropDownProps) => {
  const { isProfessionalTheme } = useThemeContext();

  const themeStyles = isProfessionalTheme
    ? "bg-slate-100 text-slate-800"
    : "bg-black text-slate-100";

  const handleChange = (value: string) => onChange(JSON.parse(value));

  return (
    <div className="w-full xl:text-sm">
      {options.length > 0 ? (
        <>
          <label htmlFor={rest.name} />
          <select
            className={twMerge(
              "border-2 border-glass w-full px-1 py-2 text-base transition-all hover:cursor-pointer focus:outline-white capitalize font-medium",
              themeStyles,
              className
            )}
            onChange={(event) => handleChange(event.target.value)}
            defaultValue="Select role"
            {...rest}
          >
            <option selected={selectedOption === null}>Select role</option>
            {options.map((option, index) => (
              <option key={index} value={JSON.stringify(option)}>
                {option.title}
              </option>
            ))}
          </select>
          <span
            className={twMerge(
              "text-sm text-gray-300",
              selectedOption ? "visible" : "invisible"
            )}
          >
            {`Note: ${selectedOption?.description}`}
          </span>
        </>
      ) : null}
    </div>
  );
};
