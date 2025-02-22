import { createParagraphBlock, createTextRichText } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createUnsupportedBlockTransformer } from "./createUnsupportedBlockTransformer";

describe("createUnsupportedBlockTransformer", () => {
  const transformer = createUnsupportedBlockTransformer({
    log: false,
  });

  it("Blockを変換できる", () => {
    const block = createParagraphBlock({
      richText: [
        createTextRichText({
          content: "test",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("");
  });
});
