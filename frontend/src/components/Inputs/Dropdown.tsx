import { OptionHTMLAttributes, SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Option = OptionHTMLAttributes<HTMLOptionElement>;

type CustomDropDownProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "onChange" | "className"
> & {
  options: Option[];
  className?: string;
  onChange: (option: Option) => void;
};

export const Dropdown = ({
  options,
  className = "",
  onChange,
  ...rest
}: CustomDropDownProps) => {
  const handleChange = (value: string) => onChange(JSON.parse(value));
  return (
    <div className="xl:text-sm">
      {options.length > 0 ? (
        <>
          <label htmlFor={rest.name} />
          <select
            className={twMerge(
              "w-full border border-black bg-white px-1 py-2 text-sm text-black transition-all hover:cursor-pointer",
              className
            )}
            onChange={(event) => handleChange(event.target.value)}
            {...rest}
          >
            {options.map((option, index) => (
              <option
                key={index}
                value={JSON.stringify(option)}
                className="capitalize"
                selected={index === 0}
              >
                {option.label}
              </option>
            ))}
          </select>
        </>
      ) : null}
    </div>
  );
};
