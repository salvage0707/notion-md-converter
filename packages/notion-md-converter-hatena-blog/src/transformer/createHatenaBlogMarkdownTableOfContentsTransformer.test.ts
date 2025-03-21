import { createTableOfContentsBlock } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createHatenaBlogMarkdownTableOfContentsTransformer } from "./createHatenaBlogMarkdownTableOfContentsTransformer";

describe("createHatenaBlogMarkdownTableOfContentsTransformer", () => {
  const transformer = createHatenaBlogMarkdownTableOfContentsTransformer();

  it("table_of_contentsブロックを変換できる", () => {
    const block = createTableOfContentsBlock();
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("[:contents]");
  });
});
