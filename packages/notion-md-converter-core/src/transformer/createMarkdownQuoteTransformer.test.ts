import { createQuoteBlock, createTextRichText } from "../test-helper";
import { createTransformerContext } from "../test-helper";
import { createMarkdownQuoteTransformer } from "./createMarkdownQuoteTransformer";

describe("createMarkdownQuoteTransformer", () => {
  const transformer = createMarkdownQuoteTransformer();

  it("quoteブロックをマークダウン形式に変換する", () => {
    const block = createQuoteBlock({
      richText: [
        createTextRichText({
          plainText: "テストメッセージ\nテストメッセージ2",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("\n> テストメッセージ\n> テストメッセージ2\n");
  });

  it("空のquoteブロックを変換する", () => {
    const block = createQuoteBlock({
      richText: [],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("\n> \n");
  });

  it("子要素がある場合は子要素も変換する", () => {
    const block = createQuoteBlock({
      richText: [
        createTextRichText({
          plainText: "親メッセージ",
        }),
      ],
      children: [
        createQuoteBlock({
          richText: [
            createTextRichText({
              plainText: "子メッセージ",
            }),
          ],
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("> 子メッセージ");

    const result = transformer(context);

    expect(result).toBe("\n> 親メッセージ\n> > 子メッセージ\n");
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
  });
});
