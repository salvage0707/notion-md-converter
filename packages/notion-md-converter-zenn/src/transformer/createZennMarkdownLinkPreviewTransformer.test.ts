import {
  createLinkPreviewBlock,
  createTransformerContext,
} from "@notion-md-converter/core/test-helper";
import { createZennMarkdownLinkPreviewTransformer } from "./createZennMarkdownLinkPreviewTransformer";

describe("createZennMarkdownLinkPreviewTransformer", () => {
  const transformer = createZennMarkdownLinkPreviewTransformer();

  it("link_previewブロックを変換できる", () => {
    const block = createLinkPreviewBlock({
      url: "https://example.com",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("https://example.com");
  });

  it("YouTubeのURLを変換できる", () => {
    const block = createLinkPreviewBlock({
      url: "https://www.youtube.com/watch?v=abcd1234",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("https://www.youtube.com/watch?v=abcd1234");
  });

  it("GitHub Gist のリンクを変換できる", () => {
    const block = createLinkPreviewBlock({
      url: "https://gist.github.com/user/123456789",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("@[gist](https://gist.github.com/user/123456789)");
  });

  it("サポートされていないドメインのURLはリンクカードとして変換されること", () => {
    const block = createLinkPreviewBlock({
      url: "https://example.com",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("https://example.com");
  });
});
