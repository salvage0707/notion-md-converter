import { createParagraphBlock, createTextRichText } from "@notion-md-converter/core/test-helper";
import { createTransformerContext } from "@notion-md-converter/core/test-helper";
import { createUnsupportedBlockTransformer } from "./createUnsupportedBlockTransformer";

describe("createUnsupportedBlockTransformer", () => {
  const transformer = createUnsupportedBlockTransformer({
    log: false,
  });

  it("Blockを変換できる", () => {
    const block = createParagraphBlock({
      richText: [
        createTextRichText({
          plainText: "test",
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
