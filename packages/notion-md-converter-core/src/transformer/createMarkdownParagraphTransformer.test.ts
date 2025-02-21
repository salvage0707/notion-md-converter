import { createParagraphBlock, createTextRichText } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownParagraphTransformer } from "./createMarkdownParagraphTransformer";

describe("createMarkdownParagraphTransformer", () => {
  const transformer = createMarkdownParagraphTransformer();
  it("テキストをマークダウン形式に変換する", () => {
    const block = createParagraphBlock({
      richText: [
        createTextRichText({
          plainText: "シンプルなテキストです。",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("シンプルなテキストです。");
  });

  it("子要素がある場合は子要素も変換する", () => {
    const block = createParagraphBlock({
      richText: [
        createTextRichText({
          plainText: "シンプルなテキストです。",
        }),
      ],
      children: [createParagraphBlock()],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("小要素があります");
    const result = transformer(context);
    expect(result).toBe("シンプルなテキストです。\n小要素があります");
  });

  it("テキストにスタイルがついている場合はスタイルを適用する", () => {
    const block = createParagraphBlock({
      richText: [
        createTextRichText({
          plainText: "シンプルな",
        }),
        createTextRichText({
          plainText: "太字",
          annotations: { bold: true },
        }),
        createTextRichText({
          plainText: "テストテキスト",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("シンプルな**太字**テストテキスト");
  });
});
