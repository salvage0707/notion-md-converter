import { createImageBlock, createTextRichText } from "@notion-md-converter/core/test-helper";
import { createTransformerContext } from "@notion-md-converter/core/test-helper";
import { createZennMarkdownImageTransformer } from "./createZennMarkdownImageTransformer";

describe("createZennMarkdownImageTransformer", () => {
  const mockAdapter = vi.fn();
  const transformer = createZennMarkdownImageTransformer({
    fileAdapter: mockAdapter,
  });

  beforeEach(() => {
    mockAdapter.mockReturnValue({ url: "https://example.com" });
  });

  it("captionがある場合、captionを含めてimageブロックを変換できる", () => {
    const block = createImageBlock({
      url: "https://example.com",
      caption: [createTextRichText({ plainText: "example" })],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("![example](https://example.com)");
  });

  it("captionがない場合、urlを含めてimageブロックを変換できる", () => {
    const block = createImageBlock({
      url: "https://example.com",
      caption: [],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("![https://example.com](https://example.com)");
  });
});
