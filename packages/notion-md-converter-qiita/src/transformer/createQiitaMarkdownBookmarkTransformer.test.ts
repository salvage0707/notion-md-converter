import { createBookmarkBlock, createTransformerContext, dedent } from "@notion-md-converter/testing";
import { createQiitaMarkdownBookmarkTransformer } from "./createQiitaMarkdownBookmarkTransformer";

describe("createQiitaMarkdownBookmarkTransformer", () => {
  const transformer = createQiitaMarkdownBookmarkTransformer();

  it("ブックマークブロックをQiitaのリンクカード形式に変換する", () => {
    const block = createBookmarkBlock({
      url: "https://example.com",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      https://example.com
    `);
  });
});
