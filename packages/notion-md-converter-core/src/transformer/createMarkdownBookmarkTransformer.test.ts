import {
  createBookmarkBlock,
  createTextRichText,
  createTransformerContext,
} from "@notion-md-converter/testing";
import { createMarkdownBookmarkTransformer } from "./createMarkdownBookmarkTransformer";

describe("createMarkdownBookmarkTransformer", () => {
  const transformer = createMarkdownBookmarkTransformer();

  it("ブックマークブロックをマークダウンリンク形式に変換する", () => {
    const block = createBookmarkBlock({
      url: "https://example.com",
      caption: [
        createTextRichText({
          content: "テストリンク",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("[テストリンク](https://example.com)");
  });

  it("キャプションが空の場合はURLのみを表示する", () => {
    const block = createBookmarkBlock({
      url: "https://example.com",
      caption: [],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("[https://example.com](https://example.com)");
  });
});
