import {
  createTableBlock,
  createTableRowBlock,
  createTextRichText,
  dedent,
} from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import type { TextRichText } from "@notion-md-converter/types";
import { createMarkdownTableTransformer } from "./createMarkdownTableTransformer";
import { MarkdownUtils } from "../utils";

const createRow = (
  plainTexts: string[],
  annotations: Partial<TextRichText["annotations"]> = {},
) => {
  return createTableRowBlock({
    children: plainTexts.map((plainText) => [
      createTextRichText({
        content: plainText,
        annotations,
      }),
    ]),
  });
};

describe("createMarkdownTableTransformer", () => {
  const transformer = createMarkdownTableTransformer();

  it("2行以上のtableブロックを変換する", () => {
    const block = createTableBlock({
      children: [
        createRow(["Header1", "Header2"]),
        createRow(["Content1", "Content2"]),
        createRow(["Content3", "Content4"]),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      | Header1  | Header2  |
      | -------- | -------- |
      | Content1 | Content2 |
      | Content3 | Content4 |
    `);
  });

  it("1行のtableブロックを変換する", () => {
    const block = createTableBlock({
      children: [createRow(["Header1", "Header2"])],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      | Header1 | Header2 |
      | ------- | ------- |
    `);
  });

  describe("annotationオプションありの場合", () => {
    const transformer = createMarkdownTableTransformer({
      enableAnnotations: {
        color: true,
      },
    });

    it("colorがtrueの場合、テキストの色を変更できる", () => {
      const block = createTableBlock({
        children: [
          createRow(["Header1", "Header2"], { color: "red" }),
          createRow(["Content1", "Content2"], { color: "red" }),
          createRow(["Content3", "Content4"], { color: "red" }),
        ],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);

      const redColor = MarkdownUtils.COLOR_MAP.red as string;
      expect(result).toBe(dedent({ wrap: true })`
      | <span style="color: ${redColor};">Header1</span>  | <span style="color: ${redColor};">Header2</span>  |
      | --------------------------------------------- | --------------------------------------------- |
      | <span style="color: ${redColor};">Content1</span> | <span style="color: ${redColor};">Content2</span> |
      | <span style="color: ${redColor};">Content3</span> | <span style="color: ${redColor};">Content4</span> |
    `);
    });
  });
});
