import { createPdfBlock, createTextRichText } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownPDFTransformer } from "./createMarkdownPDFTransformer";

describe("createMarkdownPDFTransformer", () => {
  const mockAdapter = vi.fn();
  const transformer = createMarkdownPDFTransformer({
    fileAdapter: mockAdapter,
  });

  beforeEach(() => {
    mockAdapter.mockReturnValue({
      url: "https://example.com/test.pdf",
    });
  });

  it("captionがある場合、captionを含めてpdfブロックを変換できる", () => {
    const block = createPdfBlock({
      caption: [createTextRichText({ plainText: "example.pdf" })],
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
});
