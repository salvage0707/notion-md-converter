import {
  createEmbedBlock,
  createTextRichText,
  createTransformerContext,
} from "@notion-md-converter/testing";
import { createMarkdownEmbedTransformer } from "./createMarkdownEmbedTransformer";

describe("createMarkdownEmbedTransformer", () => {
  const transformer = createMarkdownEmbedTransformer();

  it("埋込みブロックをマークダウンリンク形式に変換する", () => {
    const block = createEmbedBlock({
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
    const block = createEmbedBlock({
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
    const transformer = createMarkdownEmbedTransformer({
      enableAnnotations: {
        color: true,
      },
    });

    it("colorがtrueの場合、テキストの色を変更できる", () => {
      const block = createEmbedBlock({
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
