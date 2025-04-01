import { createChildPageBlock, createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownChildPageTransformer } from "./createMarkdownChildPageTransformer";

describe("createMarkdownChildPageTransformer", () => {
  const transformer = createMarkdownChildPageTransformer();

  it("子ページブロックをマークダウンリンク形式に変換する", () => {
    const block = createChildPageBlock({
      title: "Example",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBeNull();
  });
});
