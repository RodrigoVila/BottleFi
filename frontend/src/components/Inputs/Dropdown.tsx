import { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

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
  const handleChange = (value: string) => onChange(JSON.parse(value));

  return (
    <div className="w-full xl:text-sm">
      {options.length > 0 ? (
        <>
          <label htmlFor={rest.name} />
          <select
            className={twMerge(
              "border-2 border-glass w-full bg-black px-1 py-3 text-base text-white transition-all hover:cursor-pointer focus:outline-white",
              className
            )}
            onChange={(event) => handleChange(event.target.value)}
            defaultValue="Select role"
            {...rest}
          >
            <option disabled className="capitalize">
              Select role
            </option>
            {options.map((option, index) => (
              <option
                key={index}
                value={JSON.stringify(option)}
                className="capitalize"
              >
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
