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

  describe("annotationオプションありの場合", () => {
    const transformer = createMarkdownBookmarkTransformer({
      enableAnnotations: {
        color: true,
      },
    });

    it("colorがtrueの場合、テキストの色を変更できる", () => {
      const block = createBookmarkBlock({
        url: "https://example.com",
        caption: [
          createTextRichText({
            content: "テストリンク",
            annotations: {
              color: "red",
            },
          }),
        ],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);

      expect(result).toBe('[<span style="color: red;">テストリンク</span>](https://example.com)');
    });
  });
});
