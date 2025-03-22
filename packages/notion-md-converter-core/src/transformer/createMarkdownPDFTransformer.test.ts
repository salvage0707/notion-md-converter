import { createPdfBlock, createTextRichText } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownPDFTransformer } from "./createMarkdownPDFTransformer";

describe("createMarkdownPDFTransformer", () => {
  const mockAdapter = vi.fn();

  beforeEach(() => {
    mockAdapter.mockReturnValue({
      url: "https://example.com/test.pdf",
    });
  });

  describe("outputType: markdown-link", () => {
    const transformer = createMarkdownPDFTransformer({
      fileAdapter: mockAdapter,
      outputType: "markdown-link",
    });

    it("captionがある場合、captionを含めてpdfブロックを変換できる", () => {
      const block = createPdfBlock({
        caption: [createTextRichText({ content: "example.pdf" })],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      mockAdapter.mockReturnValue({
        url: "https://example.com/test.pdf",
      });
      const result = transformer(context);

      expect(result).toBe("[example.pdf](https://example.com/test.pdf)");
    });

    it("captionがない場合、urlを含めてpdfブロックを変換できる", () => {
      const block = createPdfBlock({
        caption: [],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      mockAdapter.mockReturnValue({
        url: "https://example.com/test.pdf",
      });
      const result = transformer(context);

      expect(result).toBe("[https://example.com/test.pdf](https://example.com/test.pdf)");
    });

    describe("annotationオプションありの場合", () => {
      const transformer = createMarkdownPDFTransformer({
        fileAdapter: mockAdapter,
        outputType: "markdown-link",
        enableAnnotations: {
          color: true,
        },
      });

      it("colorがtrueの場合、テキストの色を変更できる", () => {
        const block = createPdfBlock({
          caption: [createTextRichText({ content: "example.pdf", annotations: { color: "red" } })],
        });
        const context = createTransformerContext({
          blocks: [block],
        });

        mockAdapter.mockReturnValue({
          url: "https://example.com/test.pdf",
        });
        const result = transformer(context);

        expect(result).toBe(
          '[<span style="color: red;">example.pdf</span>](https://example.com/test.pdf)',
        );
      });
    });
  });

  describe("outputType: html-object", () => {
    const transformer = createMarkdownPDFTransformer({
      fileAdapter: mockAdapter,
      outputType: "html-object",
    });

    it("captionのメタデータがある場合、メタデータを含めてpdfブロックを変換できる", () => {
      const block = createPdfBlock({
        caption: [createTextRichText({ content: "width=600&height=400:example.pdf" })],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      mockAdapter.mockReturnValue({
        url: "https://example.com/test.pdf",
      });
      const result = transformer(context);

      expect(result).toBe(
        '<object data="https://example.com/test.pdf" type="application/pdf" width="600" height="400"></object>',
      );
    });

    it("captionのメタデータがない場合、urlを含めてpdfブロックを変換できる", () => {
      const block = createPdfBlock({
        caption: [],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      mockAdapter.mockReturnValue({
        url: "https://example.com/test.pdf",
      });
      const result = transformer(context);

      expect(result).toBe(
        '<object data="https://example.com/test.pdf" type="application/pdf" width="100%" height="250"></object>',
      );
    });
  });
});
