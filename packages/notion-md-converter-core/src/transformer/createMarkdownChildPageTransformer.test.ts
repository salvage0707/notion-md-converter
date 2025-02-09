import { createChildPageBlock, createTransformerContext } from "../test-helper";
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

    expect(result).toBe("");
  });
});
