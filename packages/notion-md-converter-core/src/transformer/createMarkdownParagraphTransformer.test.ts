import { createParagraphBlock, createTextRichText, dedent } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownParagraphTransformer } from "./createMarkdownParagraphTransformer";

describe("createMarkdownParagraphTransformer", () => {
  const transformer = createMarkdownParagraphTransformer();
  it("テキストをマークダウン形式に変換する", () => {
    const block = createParagraphBlock({
      richText: [
        createTextRichText({
          content: "シンプルなテキストです。",
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
          content: "シンプルなテキストです。",
        }),
      ],
      children: [createParagraphBlock()],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("小要素があります");
    const result = transformer(context);
    expect(result).toBe(dedent`
      シンプルなテキストです。
      小要素があります
    `);
  });

  it("テキストにスタイルがついている場合はスタイルを適用する", () => {
    const block = createParagraphBlock({
      richText: [
        createTextRichText({
          content: "シンプルな",
        }),
        createTextRichText({
          content: "太字",
          annotations: { bold: true },
        }),
        createTextRichText({
          content: "テストテキスト",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("シンプルな**太字**テストテキスト");
  });

  describe("brオプションがtrueの場合", () => {
    const transformer = createMarkdownParagraphTransformer({ br: true });

    it("テキストをマークダウン形式に変換する", () => {
      const block = createParagraphBlock({
        richText: [
          createTextRichText({
            content: "シンプルなテキストです。",
          }),
        ],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);
      expect(result).toBe("シンプルなテキストです。<br />");
    });

    it("子要素がある場合は子要素も変換する", () => {
      const block = createParagraphBlock({
        richText: [
          createTextRichText({
            content: "シンプルなテキストです。",
          }),
        ],
        children: [createParagraphBlock()],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      context.mockedExecute.mockReturnValue("小要素があります");
      const result = transformer(context);
      expect(result).toBe(dedent`
      シンプルなテキストです。
      小要素があります<br />
    `);
    });
  });

  describe("annotationオプションありの場合", () => {
    const transformer = createMarkdownParagraphTransformer({
      enableAnnotations: {
        color: true,
      },
    });

    it("colorがtrueの場合、テキストの色を変更できる", () => {
      const block = createParagraphBlock({
        richText: [
          createTextRichText({
            content: "シンプルなテキストです。",
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

      expect(result).toBe('<span style="color: red;">シンプルなテキストです。</span>');
    });
  });
});
