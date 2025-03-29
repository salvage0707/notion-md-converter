import { CHAR, createQuoteBlock, createTextRichText, dedent } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { MarkdownUtils } from "../utils";
import { createMarkdownQuoteTransformer } from "./createMarkdownQuoteTransformer";

describe("createMarkdownQuoteTransformer", () => {
  const transformer = createMarkdownQuoteTransformer();

  it("quoteブロックをマークダウン形式に変換する", () => {
    const block = createQuoteBlock({
      richText: [
        createTextRichText({
          content: dedent`
            テストメッセージ
            テストメッセージ2
          `,
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      > テストメッセージ
      > テストメッセージ2
    `);
  });

  it("空のquoteブロックを変換する", () => {
    const block = createQuoteBlock({
      richText: [],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      >${CHAR.SPACE}
    `);
  });

  it("子要素がある場合は子要素も変換する", () => {
    const block = createQuoteBlock({
      richText: [
        createTextRichText({
          content: "親メッセージ",
        }),
      ],
      children: [
        createQuoteBlock({
          richText: [
            createTextRichText({
              content: "子メッセージ",
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

    expect(result).toBe(dedent({ wrap: true })`
      > 親メッセージ
      > > 子メッセージ
    `);
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
  });

  describe("annotationオプションありの場合", () => {
    const transformer = createMarkdownQuoteTransformer({
      enableAnnotations: {
        color: true,
      },
    });

    it("colorがtrueの場合、テキストの色を変更できる", () => {
      const block = createQuoteBlock({
        richText: [
          createTextRichText({
            content: dedent`
              テストメッセージ
              テストメッセージ2
            `,
            annotations: {
              color: "red",
            },
          }),
        ],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);

      const redColor = MarkdownUtils.COLOR_MAP.red as string;
      expect(result).toBe(dedent({ wrap: true })`
        > <span style="color: ${redColor};">テストメッセージ
        > テストメッセージ2</span>
      `);
    });
  });
});
