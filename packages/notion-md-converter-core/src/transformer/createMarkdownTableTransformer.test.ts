import { createTableBlock, createTableRowBlock, createTextRichText } from "../test-helper";
import { createTransformerContext } from "../test-helper";
import { createMarkdownTableTransformer } from "./createMarkdownTableTransformer";

const createRow = (plainTexts: string[]) => {
  return createTableRowBlock({
    children: plainTexts.map((plainText) => [
      createTextRichText({
        root: { plain_text: plainText },
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

    const expected = [
      "", // 改行
      "| Header1  | Header2  |",
      "| -------- | -------- |",
      "| Content1 | Content2 |",
      "| Content3 | Content4 |",
      "", // 改行
    ].join("\n");
    expect(result).toBe(expected);
  });

  it("1行のtableブロックを変換する", () => {
    const block = createTableBlock({
      children: [createRow(["Header1", "Header2"])],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    const expected = [
      "", // 改行
      "| Header1 | Header2 |",
      "| ------- | ------- |",
      "", // 改行
    ].join("\n");
    expect(result).toBe(expected);
  });
});
