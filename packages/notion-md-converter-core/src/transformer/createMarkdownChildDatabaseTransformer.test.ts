import { createChildDatabaseBlock, createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownChildDatabaseTransformer } from "./createMarkdownChildDatabaseTransformer";

describe("createMarkdownChildDatabaseTransformer", () => {
  const transformer = createMarkdownChildDatabaseTransformer();

  it("子データベースブロックをマークダウンリンク形式に変換する", () => {
    const block = createChildDatabaseBlock({
      title: "Example",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("");
  });
});
