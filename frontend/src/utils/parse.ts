export const parseAccount = (account: string) => {
  // TODO: Makes this regex extensible. Not every wallet is eip155
  const cleanedStr = account.replace(/eip155:\d{1,3}:/, "");
  const first5 = cleanedStr.slice(0, 5);
  const last3 = cleanedStr.slice(-3);

  return `${first5}...${last3}`;
};
