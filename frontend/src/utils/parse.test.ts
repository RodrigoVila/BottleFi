import {
  parseAccount,
  parseBigInt,
  parseBigNumToDate,
  parseWalletError,
} from "./parse";

describe("Parse Utils", () => {
  it("should parseAccount", () => {
    const parsed = parseAccount("0ax12fcb4c13x3ab31x3s");
    expect(parsed).toBe("0ax1...1x3s");
  });

  it("Should parseBigInt and parseBigNumToDate", () => {
    const bigNum = 1331300839;
    const parsed = parseBigInt(BigInt(1331300839));
    expect(parsed.toString()).toBe("82429610041");

    const date = parseBigNumToDate(bigNum);
    expect(date).toBe("3/9/2012");
  });

  it("Should parseWalletErrors", () => {
    const error1 = "user rejected action";
    const parsedError1 = parseWalletError(error1);
    expect(parsedError1).toBe("User rejected wallet request, please try again");

    const error2 = "already pending for origin";
    const parsedError2 = parseWalletError(error2);
    expect(parsedError2).toBe(
      "Already sent a login permission to wallet. Please go to your selected wallet and accept the request"
    );

    const defaultError = "Fake error";
    const parsedDefaultErr = parseWalletError(defaultError);
    expect(parsedDefaultErr).toBe("Unknown wallet error");
  });
});
