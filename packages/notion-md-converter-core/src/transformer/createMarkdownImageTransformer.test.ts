import { createImageBlock, createTextRichText } from "../test-helper";
import { createTransformerContext } from "../test-helper";
import { createMarkdownImageTransformer } from "./createMarkdownImageTransformer";

describe("createMarkdownImageTransformer", () => {
  const mockAdaptor = {
    execute: vi.fn(),
  };
  const transformer = createMarkdownImageTransformer({
    fileAdaptor: mockAdaptor,
  });

  beforeEach(() => {
    mockAdaptor.execute.mockReturnValue({ url: "https://example.com" });
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
