import { InputHTMLAttributes } from "react";
import { BsFillCloudUploadFill } from "react-icons/bs";

type FileInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const FileInput = ({ label, ...rest }: FileInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white font-semibold">{label}</label>
      <label htmlFor="file-upload" className="custom-file-upload">
        <div className="bg-black p-px w-full rounded-md flex items-center gap-2 py-1 px-2">
          <BsFillCloudUploadFill />
          Upload File
        </div>
      </label>
      <input id="file-upload" type="file" {...rest} />
    </div>
  );
};
