import {
  createTableBlock,
  createTableRowBlock,
  createTextRichText,
  dedent,
} from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import type { TextRichText } from "@notion-md-converter/types";
import { createMarkdownTableTransformer } from "./createMarkdownTableTransformer";

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
    // Header
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(
      block.children[0].table_row.cells[0],
    );
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(
      block.children[0].table_row.cells[1],
    );
    // Row1
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(
      block.children[1].table_row.cells[0],
    );
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(
      block.children[1].table_row.cells[1],
    );
    // Row2
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(
      block.children[2].table_row.cells[0],
    );
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(
      block.children[2].table_row.cells[1],
    );
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

    // Header
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(
      block.children[0].table_row.cells[0],
    );
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(
      block.children[0].table_row.cells[1],
    );
  });
});
