import {
  createEmbedBlock,
  createTextRichText,
  createTransformerContext,
} from "@notion-md-converter/testing";
import { createQiitaMarkdownEmbedTransformer } from "./createQiitaMarkdownEmbedTransformer";

describe("createQiitaMarkdownEmbedTransformer", () => {
  const transformer = createQiitaMarkdownEmbedTransformer();

  it("埋込みブロックを埋め込み形式に変換する", () => {
    const block = createEmbedBlock({
      url: "https://www.youtube.com/watch?v=example",
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

    expect(result).toBe(
      '<iframe width="560" height="315" src="https://www.youtube.com/embed/example" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>',
    );
  });

  it("埋込みブロックのURLが埋め込み形式に未対応の場合はリンクカード形式に変換する", () => {
    const block = createEmbedBlock({
      url: "https://example.com",
      caption: [],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("https://example.com");
  });
});
