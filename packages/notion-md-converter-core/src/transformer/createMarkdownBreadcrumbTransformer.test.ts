import { createBreadcrumbBlock, createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownBreadcrumbTransformer } from "./createMarkdownBreadcrumbTransformer";

describe("createMarkdownBreadcrumbTransformer", () => {
  const transformer = createMarkdownBreadcrumbTransformer();

  it("パンくずブロックを空文字列に変換する", () => {
    const block = createBreadcrumbBlock();
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBeNull();
  });
});
