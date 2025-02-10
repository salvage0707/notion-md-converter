import {
  createNumberedListItemBlock,
  createTextRichText,
  createTransformerContext,
} from "../test-helper";
import { createMarkdownNumberedListItemTransformer } from "./createMarkdownNumberedListItemTransformer";

describe("createMarkdownNumberedListItemTransformer", () => {
  const transformer = createMarkdownNumberedListItemTransformer();

  it("番号付きリストブロックをマークダウン形式に変換する", () => {
    const block = createNumberedListItemBlock({
      richText: [
        createTextRichText({
          root: {
            plain_text: "テストテキストone",
          },
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
          root: {
            plain_text: "テストテキストone",
          },
        }),
      ],
    });
    const block2 = createNumberedListItemBlock({
      richText: [
        createTextRichText({
          root: {
            plain_text: "テストテキストtwo",
          },
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
          root: {
            plain_text: "親テキスト",
          },
        }),
      ],
      children: [
        createNumberedListItemBlock({
          richText: [
            createTextRichText({
              root: {
                plain_text: "子テキスト",
              },
            }),
          ],
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("1. 子テキスト\n  1. 孫テキスト");
    const result = transformer(context);

    expect(result).toBe("1. 親テキスト\n  1. 子テキスト\n    1. 孫テキスト");
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
  });
});
