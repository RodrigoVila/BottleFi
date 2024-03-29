import { InputHTMLAttributes } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";

type FileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>,"value"> & {
  value: File | null
  label?: string;
};

export const FileInput = ({ value, label, ...rest }: FileInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="hidden font-semibold text-white md:block">{label}</p>
      <label htmlFor="file-upload" className="custom-file-upload">
        <div className="flex items-center w-full gap-2 px-2 bg-transparent border-2 rounded-md border-glass focus:outline-none focus:border-white py-[6px]">
          <BsFillCloudUploadFill />
          {value?.name || "Upload File"}
        </div>
      </label>
      <input id="file-upload" type="file" aria-label="file-input" {...rest} />
    </div>
  );
};
