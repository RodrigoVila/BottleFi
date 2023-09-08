import { Spinner } from "@components/Spinner";

type UserBalance = {
  balance: string | null;
};

export const UserBalance = ({ balance }: UserBalance) => {
  return (
    <div className="overflow-hidden text-xs border-2 rounded-xl border-glass center">
      <div className="flex flex-1 py-[6px] px-1 text-center bg-glass">
        Balance
      </div>
      <div className="flex-1 px-2 center">
        {balance ? (
          <p className="text-sm font-medium">{balance}</p>
        ) : (
          <Spinner svgClassName="h-4 w-4" />
        )}
      </div>
    </div>
  );
};
