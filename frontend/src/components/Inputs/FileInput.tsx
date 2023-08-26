import { InputHTMLAttributes } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const FileInput = ({ label, ...rest }: FileInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white ">{label}</label>
      <label htmlFor="file-upload" className="custom-file-upload">
        <div className="flex items-center w-full gap-2 px-2 bg-transparent border-2 rounded-md border-glass focus:outline-none focus:border-white py-[6px]">
          <BsFillCloudUploadFill />
          Upload File
        </div>
      </label>
      <input id="file-upload" type="file" {...rest} />
    </div>
  );
};
