import { createLinkPreviewBlock } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
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
