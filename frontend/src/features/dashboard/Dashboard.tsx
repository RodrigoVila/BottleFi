import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { useAuthContext, useDappContext, useThemeContext } from "@hooks";
import { Spinner } from "@components/Spinner";

import { TokensTable } from "./TokensTable";

export const Dashboard = () => {
  const { isLoading, tokens } = useDappContext();
  const { isProfessionalTheme } = useThemeContext();
  const { user } = useAuthContext();

  const isSupplier = user?.role === "supplier";

  const themeStyles = isProfessionalTheme ? "text-gray-100" : "text-white";

  const renderMessage = () => {
    if (isLoading) {
      return <Spinner>Loading tokens...</Spinner>;
    }

    if (!user?.address) {
      return (
        <p>
          You are not logged in. Please log in using the button in the top-right
          corner to access your dashboard.
        </p>
      );
    }

    return isSupplier ? (
      <p>
        You don’t have any tokens yet. As a supplier, you can
        <Link to="/mint" className="underline mx-1 font-bold">
          mint
        </Link>
        tokens by clicking the navlink at the above navigation bar.
        Alternatively, you can receive tokens from another supplier
      </p>
    ) : (
      <p>
        You don’t have any tokens yet. Since you don’t have a supplier role,
        please ask a supplier to mint and transfer tokens to you.
      </p>
    );
  };

  return (
    <div className="flex-col w-full max-w-4xl gap-2 mx-2 min-w-xl lg:mx-0 center">
      {tokens.length > 0 ? (
        <TokensTable tokens={tokens} />
      ) : (
        <div
          className={twMerge(
            "w-full h-screen px-8 text-xl text-center center",
            themeStyles
          )}
        >
          {renderMessage()}
        </div>
      )}
    </div>
  );
};
