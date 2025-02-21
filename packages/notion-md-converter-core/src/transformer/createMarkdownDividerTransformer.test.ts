import { createDividerBlock, createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownDividerTransformer } from "./createMarkdownDividerTransformer";

describe("createMarkdownDividerTransformer", () => {
  const transformer = createMarkdownDividerTransformer();

  test("dividerブロックを変換できる", () => {
    const block = createDividerBlock();
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("\n---\n");
  });
});
