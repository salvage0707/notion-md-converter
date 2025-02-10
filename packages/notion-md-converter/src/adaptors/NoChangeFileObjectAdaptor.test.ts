import { createNotionExternalFile, createNotionInternalFile } from "../test-helper";
import { NoChangeFileObjectAdaptor } from "./NoChangeFileObjectAdaptor";

describe("NoChangeFileObjectAdaptor", () => {
  let adaptor: NoChangeFileObjectAdaptor;

  beforeEach(() => {
    adaptor = new NoChangeFileObjectAdaptor();
  });

  describe("execute", () => {
    it("should return internal file url", () => {
      const fileObject = createNotionInternalFile({
        url: "https://example.com/internal.pdf",
      });
      expect(adaptor.execute(fileObject)).toEqual({
        url: "https://example.com/internal.pdf",
      });
    });

    it("should return external file url", () => {
      const fileObject = createNotionExternalFile({
        url: "https://example.com/external.pdf",
      });
      expect(adaptor.execute(fileObject)).toEqual({
        url: "https://example.com/external.pdf",
      });
    });
  });
});
