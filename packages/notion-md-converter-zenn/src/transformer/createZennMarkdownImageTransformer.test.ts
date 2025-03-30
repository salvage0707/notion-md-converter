import { createImageBlock, createTextRichText } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
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
      caption: [createTextRichText({ content: "example" })],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("![example](https://example.com)");
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.image.caption);
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

  it("幅指定がある場合、幅指定を含めてimageブロックを変換できる", () => {
    const block = createImageBlock({
      url: "https://example.com",
      caption: [createTextRichText({ content: "width=100:example" })],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("![example](https://example.com =100x)");
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith([
      createTextRichText({ content: "example" }),
    ]);
  });
});
