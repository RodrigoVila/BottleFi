
import { twMerge } from "tailwind-merge";

type CustomIconProps = {
  src: string;
  alt: string;
  className?: string;
};
const CustomIcon = ({ src, alt, className }: CustomIconProps) => {
  return (
    <img className={twMerge("w-6 h-6", className)} src={src} alt={alt} />
  );
};

export default CustomIcon;
