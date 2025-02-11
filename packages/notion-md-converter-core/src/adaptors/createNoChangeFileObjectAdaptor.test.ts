import { createNotionExternalFile, createNotionInternalFile } from "../test-helper";
import { createNoChangeFileObjectAdaptor } from "./createNoChangeFileObjectAdaptor";

describe("NoChangeFileObjectAdaptor", () => {
  const adaptor = createNoChangeFileObjectAdaptor();

  describe("execute", () => {
    it("should return internal file url", () => {
      const fileObject = createNotionInternalFile({
        url: "https://example.com/internal.pdf",
      });
      expect(adaptor(fileObject)).toEqual({
        url: "https://example.com/internal.pdf",
      });
    });

    it("should return external file url", () => {
      const fileObject = createNotionExternalFile({
        url: "https://example.com/external.pdf",
      });
      expect(adaptor(fileObject)).toEqual({
        url: "https://example.com/external.pdf",
      });
    });
  });
});
