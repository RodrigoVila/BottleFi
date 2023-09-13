import { readFileAsArrayBuffer } from "./file";

describe("File util", () => {
  it("Should read file and return array buffer", async () => {

    const fakeFile = new File(["dummy content"], "testfile.txt", { type: "text/plain" });
    const buffer = await readFileAsArrayBuffer(fakeFile)

    expect(buffer.byteLength).toBe(13);
  });
});
