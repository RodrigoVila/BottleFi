import "./Dashboard.css";

import { TokensTable } from "./TokensTable";

export const Dashboard = () => {
  return (
    <div className="flex-col w-full max-w-4xl gap-2 mx-2 min-w-xl lg:mx-0 center">
      <TokensTable />
    </div>
  );
};
