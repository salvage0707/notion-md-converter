import {
  createTableBlock,
  createTableRowBlock,
  createTextRichText,
  dedent,
} from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownTableTransformer } from "./createMarkdownTableTransformer";

const createRow = (plainTexts: string[]) => {
  return createTableRowBlock({
    children: plainTexts.map((plainText) => [
      createTextRichText({
        content: plainText,
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
});
