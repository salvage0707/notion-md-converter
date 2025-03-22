import {
  createHeading1Block,
  createHeading2Block,
  createHeading3Block,
  createTextRichText,
  dedent,
} from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownHeadingTransformer } from "./createMarkdownHeadingTransformer";
import { MarkdownUtils } from "../utils";

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
  });

  describe("annotationオプションありの場合", () => {
    const transformer = createMarkdownHeadingTransformer({
      enableAnnotations: {
        color: true,
      },
    });

    it("colorがtrueの場合、テキストの色を変更できる", () => {
      const block = createHeading1Block({
        richText: [
          createTextRichText({
            content: "見出し1",
            annotations: {
              color: "red",
            },
          }),
        ],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);
      const redColor = MarkdownUtils.COLOR_MAP.red as string;
      expect(result).toBe(dedent({ wrap: true })`
        # <span style="color: ${redColor};">見出し1</span>
      `);
    });
  });
});
