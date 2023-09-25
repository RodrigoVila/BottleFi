import "./Dashboard.css";
import { Link } from "react-router-dom";

import { useDappContext } from "@hooks";
import { Spinner } from "@components/Spinner";

import { TokensTable } from "./TokensTable";

export const Dashboard = () => {
  const { isLoading, tokens } = useDappContext();

  return (
    <div className="flex-col w-full max-w-4xl gap-2 mx-2 min-w-xl lg:mx-0 center">
      {tokens.length > 0 ? (
        <TokensTable tokens={tokens} />
      ) : (
        <div className="w-full h-screen px-8 text-xl text-center center">
          {isLoading ? (
            <Spinner>Loading tokens...</Spinner>
          ) : (
            <p>
              You don't have tokens yet. If you have a Supplier role, then you
              can
              <Link className="mx-1 font-bold underline" to="/mint">
                mint
              </Link>
              one. Otherwise you can transfer to this address from an account
              with that role.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
