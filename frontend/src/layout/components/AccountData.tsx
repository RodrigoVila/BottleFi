
import { parseAccount } from "@utils/parse";

export const AccountData = () => {
  const account = "lksaekesle3a9a3939sa3"

  return account ? (
    <div className="flex items-center justify-end flex-1 w-1/3 pr-2">{parseAccount(account)}</div>
  ) : null;
};