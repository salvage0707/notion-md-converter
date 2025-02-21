import { createBulletedListItemBlock, createTextRichText } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownBulletedListItemTransformer } from "./createMarkdownBulletedListItemTransformer";

describe("createMarkdownBulletedListItemTransformer", () => {
  const transformer = createMarkdownBulletedListItemTransformer();

  it("箇条書きブロックをマークダウン形式に変換する", () => {
    const block = createBulletedListItemBlock({
      richText: [
        createTextRichText({
          plainText: "テストテキスト",
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
          plainText: "親テキスト",
        }),
      ],
      children: [
        createBulletedListItemBlock({
          richText: [
            createTextRichText({
              plainText: "子テキスト",
            }),
          ],
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("- 子テキスト\n  - 孫テキスト");
    const result = transformer(context);

    expect(result).toBe("- 親テキスト\n  - 子テキスト\n    - 孫テキスト");
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
  });
});
