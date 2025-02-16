import { createPdfBlock, createTextRichText } from "@notion-md-converter/core/test-helper";
import { createTransformerContext } from "@notion-md-converter/core/test-helper";
import { createZennMarkdownPDFTransformer } from "./createZennMarkdownPDFTransformer";

describe("createZennMarkdownPDFTransformer", () => {
  const mockAdapter = vi.fn();
  const transformer = createZennMarkdownPDFTransformer({
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
