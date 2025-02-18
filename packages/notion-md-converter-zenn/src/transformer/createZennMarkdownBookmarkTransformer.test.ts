import {
  createBookmarkBlock,
  createTransformerContext,
} from "@notion-md-converter/core/test-helper";
import { createZennMarkdownBookmarkTransformer } from "./createZennMarkdownBookmarkTransformer";

describe("createZennMarkdownBookmarkTransformer", () => {
  const transformer = createZennMarkdownBookmarkTransformer();

  it("ブックマークブロックをZennのマークダウン形式に変換する", () => {
    const block = createBookmarkBlock({
      url: "https://example.com",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("https://example.com");
  });
});
