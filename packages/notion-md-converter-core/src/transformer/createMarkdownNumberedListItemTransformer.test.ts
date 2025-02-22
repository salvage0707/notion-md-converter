import {
  createNumberedListItemBlock,
  createTextRichText,
  createTransformerContext,
  dedent,
} from "@notion-md-converter/testing";
import { createMarkdownNumberedListItemTransformer } from "./createMarkdownNumberedListItemTransformer";

describe("createMarkdownNumberedListItemTransformer", () => {
  const transformer = createMarkdownNumberedListItemTransformer();

  it("番号付きリストブロックをマークダウン形式に変換する", () => {
    const block = createNumberedListItemBlock({
      richText: [
        createTextRichText({
          content: "テストテキストone",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("1. テストテキストone");
  });

  it("番号付きリストブロックの番号が連番のマークダウン形式に変換する", () => {
    const block1 = createNumberedListItemBlock({
      richText: [
        createTextRichText({
          content: "テストテキストone",
        }),
      ],
    });
    const block2 = createNumberedListItemBlock({
      richText: [
        createTextRichText({
          content: "テストテキストtwo",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block1, block2],
      currentBlockIndex: 1,
    });

    const result = transformer(context);

    expect(result).toBe("2. テストテキストtwo");
  });

  it("子要素がある場合は子要素も変換する", () => {
    const block = createNumberedListItemBlock({
      richText: [
        createTextRichText({
          content: "親テキスト",
        }),
      ],
      children: [
        createNumberedListItemBlock({
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

    context.mockedExecute.mockReturnValue(dedent`
      1. 子テキスト
         1. 孫テキスト
    `);
    const result = transformer(context);

    expect(result).toBe(dedent`
      1. 親テキスト
         1. 子テキスト
            1. 孫テキスト
    `);
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
  });
});
