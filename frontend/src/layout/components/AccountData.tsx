
import { parseAccount } from "@utils/parse";

export const AccountData = () => {
  const account = "lksaekesle3a9a3939sa3"

  return account ? (
    <div className="flex flex-1 items-center justify-end w-1/3 pr-2">{parseAccount(account)}</div>
  ) : null;
};