import {
  createBulletedListItemBlock,
  createTextRichText,
  dedent,
} from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownBulletedListItemTransformer } from "./createMarkdownBulletedListItemTransformer";

describe("createMarkdownBulletedListItemTransformer", () => {
  const transformer = createMarkdownBulletedListItemTransformer();

  it("箇条書きブロックをマークダウン形式に変換する", () => {
    const block = createBulletedListItemBlock({
      richText: [
        createTextRichText({
          content: "テストテキスト",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("- テストテキスト");
  });

  it("子要素がある場合は子要素も変換する", () => {
    const block = createBulletedListItemBlock({
      richText: [
        createTextRichText({
          content: "親テキスト",
        }),
      ],
      children: [
        createBulletedListItemBlock({
          richText: [
            createTextRichText({
              content: "子テキスト",
            }),
          ],
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const nestedValue = dedent`
      - 子テキスト
        - 孫テキスト
    `;
    context.mockedExecute.mockReturnValue(nestedValue);
    const result = transformer(context);

    const expected = dedent`
      - 親テキスト
        - 子テキスト
          - 孫テキスト
    `;
    expect(result).toBe(expected);
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
  });
});
