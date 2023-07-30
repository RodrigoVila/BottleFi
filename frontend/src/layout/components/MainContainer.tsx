import { ReactNode, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { useContextStyles } from "@context/styles";

type SectionsType = {
  [key: string]: string;
  Section1: string;
  Section2: string;
  Section3: string;
  default: string;
};

type AccessSection = {
  keyName: keyof SectionsType;
};

export const MainContainer = ({ children }: { children: ReactNode }) => {
  const { sectionID } = useContextStyles();

  const borderColor = useMemo(() => {
    const sections: SectionsType = {
      Section1: "border-l-opacityRed border-t-opacityRed",
      Section2: "border-l-opacityOrange border-t-opacityOrange",
      Section3: "border-l-opacityYellow border-t-opacityYellow",
      default: "border-l-transparent border-t-transparent",
    };

    return sections[sectionID] || sections["default"];
  }, [sectionID]);

  return (
    <main
      className={twMerge(
        "z-1 relative flex items-center w-full h-full overflow-hidden border-t-2 border-l-2",
        borderColor
      )}
    >
      {children}
    </main>
  );
};
