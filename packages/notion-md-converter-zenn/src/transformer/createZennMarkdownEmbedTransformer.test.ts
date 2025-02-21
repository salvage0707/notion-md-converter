import {
  createEmbedBlock,
  createTextRichText,
  createTransformerContext,
} from "@notion-md-converter/testing";
import { createZennMarkdownEmbedTransformer } from "./createZennMarkdownEmbedTransformer";

describe("createZennMarkdownEmbedTransformer", () => {
  const transformer = createZennMarkdownEmbedTransformer();

  it("埋込みブロックをマークダウンリンク形式に変換する", () => {
    const block = createEmbedBlock({
      url: "https://example.com",
      caption: [
        createTextRichText({
          plainText: "テストリンク",
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
});
