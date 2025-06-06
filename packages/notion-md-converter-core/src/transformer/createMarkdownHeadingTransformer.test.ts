import {
  createHeading1Block,
  createHeading2Block,
  createHeading3Block,
  createTextRichText,
  dedent,
} from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownHeadingTransformer } from "./createMarkdownHeadingTransformer";

describe("createMarkdownHeadingTransformer", () => {
  const transformer = createMarkdownHeadingTransformer();

  it("heading_1ブロックを変換できる", () => {
    const block = createHeading1Block({
      richText: [
        createTextRichText({
          content: "見出し1",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe(dedent({ wrap: true })`
      # 見出し1
    `);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.heading_1.rich_text);
  });

  it("heading_2ブロックを変換できる", () => {
    const block = createHeading2Block({
      richText: [
        createTextRichText({
          content: "見出し2",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe(dedent({ wrap: true })`
      ## 見出し2
    `);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.heading_2.rich_text);
  });

  it("heading_3ブロックを変換できる", () => {
    const block = createHeading3Block({
      richText: [
        createTextRichText({
          content: "見出し3",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe(dedent({ wrap: true })`
      ### 見出し3
    `);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.heading_3.rich_text);
  });
});
