import {
  createLinkPreviewBlock,
  createTransformerContext,
  dedent,
} from "@notion-md-converter/testing";
import { createQiitaMarkdownLinkPreviewTransformer } from "./createQiitaMarkdownLinkPreviewTransformer";

describe("createQiitaMarkdownLinkPreviewTransformer", () => {
  const transformer = createQiitaMarkdownLinkPreviewTransformer();

  it("link_previewブロックを変換できる", () => {
    const block = createLinkPreviewBlock({
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

  it("YouTubeのURLを変換できる", () => {
    const block = createLinkPreviewBlock({
      url: "https://www.youtube.com/watch?v=abcd1234",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe(
      '<iframe width="560" height="315" src="https://www.youtube.com/watch?v=abcd1234" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy" allowfullscreen></iframe>',
    );
  });

  it("GitHub Gist のリンクを変換できる", () => {
    const block = createLinkPreviewBlock({
      url: "https://gist.github.com/user/123456789",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("https://gist.github.com/user/123456789");
  });
});
