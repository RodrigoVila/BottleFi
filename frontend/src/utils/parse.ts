export const parseAccount = (account: string) => {
  // TODO: Makes this regex extensible. Not every wallet is eip155
  const cleanedStr = account.replace(/eip155:\d{1,3}:/, "");
  const first5 = cleanedStr.slice(0, 5);
  const last3 = cleanedStr.slice(-3);

  return `${first5}...${last3}`;
};

export const parseWalletError = (errorMessage: string) => {
  if (errorMessage.includes("user rejected action")) {
    alert("User rejected wallet request, please try again.");
  } else if (errorMessage.includes("already pending for origin")) {
    alert(
      "Already sent a login permission to wallet. Please go to your selected wallet and accept the request."
    );
  } else {
    alert("Error trying to connect to wallet.");
  }
};

export const parseCatchError = (error: unknown): string => {
  return error instanceof Error ? error.message : (error as string);
};
