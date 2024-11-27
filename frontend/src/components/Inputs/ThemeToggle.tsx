import { useDappContext } from "@hooks";
import { LiaUserTieSolid } from "react-icons/lia";
import { PiMountains } from "react-icons/pi";

export const ThemeToggle = () => {

    const { isProfessionalTheme, setTheme } = useDappContext()

    const handleToggle = () => setTheme((currTheme) => currTheme === 'professional' ? 'futuristic' : 'professional')

    return (
        <div className="flex items-center w-full gap-2">
            <LiaUserTieSolid size={25} />
            <div
                className={`relative inline-flex items-center h-6 w-11 rounded-full cursor-pointer transition-colors ${isProfessionalTheme ? "bg-green-500" : "bg-blue-500"
                    }`}
                onClick={handleToggle}
            >
                <span
                    className={`absolute h-4 w-4 rounded-full bg-white shadow-md transition-transform transform ${isProfessionalTheme ? "translate-x-1" : "translate-x-6"
                        }`}
                />
            </div>
            <PiMountains size={25} />
        </div>
    );
};
