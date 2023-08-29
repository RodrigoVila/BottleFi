import { InputHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

import { Roles } from "@types";

type RadioInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "value"
> & {
  children: ReactNode;
  value: Roles;
  onChange: (value: Roles) => void;
  className?: string;
};

export const RadioInput = ({
  children,
  value,
  onChange,
  className,
  ...rest
}: RadioInputProps) => {
  return (
    <div
      className="flex items-center my-1 ml-2"
      onClick={() => onChange(value)}
    >
      {/* Input set as readOnly because onChange is being handled by parent div */}
      {/* TODO: Fix: It wasn't working on the usual way because of clicking issues. This is a workaround */}
      <input
        readOnly
        type="radio"
        className={twMerge("mr-2", className)}
        {...rest}
      />
      <label htmlFor={rest.id}>{children}</label>
    </div>
  );
};
