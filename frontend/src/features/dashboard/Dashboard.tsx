import { Link } from "react-router-dom";

import { useAuthContext, useDappContext } from "@hooks";
import { Spinner } from "@components/Spinner";

import { TokensTable } from "./TokensTable";

export const Dashboard = () => {
  const { isLoading, tokens } = useDappContext();
  const { user } = useAuthContext();

  return (
    <div className="flex-col w-full max-w-4xl gap-2 mx-2 min-w-xl lg:mx-0 center">
      {tokens.length > 0 ? (
        <TokensTable tokens={tokens} />
      ) : (
        <div className="w-full h-screen px-8 text-xl text-center center">
          {isLoading ? (
            <Spinner>Loading tokens...</Spinner>
          ) : user?.address ? (
            <p>
              You don't have tokens yet. If you have a Supplier role, then you
              can
              <Link className="mx-1 font-bold underline" to="/mint">
                mint
              </Link>
              one. Otherwise you can transfer to this address from an account
              with that role.
            </p>
          ) : (
            <p>
              You are not logged in. Please login using the button at the
              top-right part of the screen to see your dashboard.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
