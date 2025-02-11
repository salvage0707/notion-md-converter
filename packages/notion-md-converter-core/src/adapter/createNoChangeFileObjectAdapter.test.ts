import { createNotionExternalFile, createNotionInternalFile } from "../test-helper";
import { createNoChangeFileObjectAdapter } from "./createNoChangeFileObjectAdapter";

describe("NoChangeFileObjectAdapter", () => {
  const adapter = createNoChangeFileObjectAdapter();

  describe("execute", () => {
    it("should return internal file url", () => {
      const fileObject = createNotionInternalFile({
        url: "https://example.com/internal.pdf",
      });
      expect(adapter(fileObject)).toEqual({
        url: "https://example.com/internal.pdf",
      });
    });

    it("should return external file url", () => {
      const fileObject = createNotionExternalFile({
        url: "https://example.com/external.pdf",
      });
      expect(adapter(fileObject)).toEqual({
        url: "https://example.com/external.pdf",
      });
    });
  });
});
