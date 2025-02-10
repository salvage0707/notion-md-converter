import { createLinkPreviewBlock } from "../test-helper";
import { createTransformerContext } from "../test-helper";
import { createMarkdownLinkPreviewTransformer } from "./createMarkdownLinkPreviewTransformer";

describe("createMarkdownLinkPreviewTransformer", () => {
  const transformer = createMarkdownLinkPreviewTransformer();

  it("link_previewブロックを変換できる", () => {
    const block = createLinkPreviewBlock({
      url: "https://example.com",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("[https://example.com](https://example.com)");
  });
});
