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
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.embed.caption);
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

  describe("provider embedオプションありの場合", () => {
    const transformer = createMarkdownEmbedTransformer({
      supportedEmbedProviders: {
        youtube: true,
        codepen: true,
        asciinema: true,
      },
    });

    it("対応しているプロバイダーの場合、埋め込みHTMLに変換する", () => {
      const block = createEmbedBlock({
        url: "https://www.youtube.com/watch?v=123456789",
        caption: [],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);

      expect(result).toBe(
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/123456789" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>',
      );
    });

    it("対応していない埋め込みURLの場合はリンク形式に変換する", () => {
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
});
