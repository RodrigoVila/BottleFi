import "./Dashboard.css";
import { twMerge } from "tailwind-merge";

import { TokensTable } from "./TokensTable";

export const Dashboard = () => {
  return (
    <div className="flex-col w-full max-w-4xl gap-2 mx-2 min-w-xl lg:mx-0 center">
      {/* <h3 className="text-4xl font-medium font-marcellus">Dashboard</h3> */}
      <div
        id="dashboard"
        className={twMerge(
          "flex flex-col w-full text-white glass-alt border-glass border-[2px] rounded-xl h-96 overflow-scroll"
        )}
      >
        <TokensTable />
      </div>
    </div>
  );
};
