import {
  CHAR,
  createCalloutBlock,
  createTextRichText,
  createTransformerContext,
  dedent,
} from "@notion-md-converter/testing";
import { createMarkdownCalloutTransformer } from "./createMarkdownCalloutTransformer";
import { MarkdownUtils } from "../utils";

describe("createMarkdownCalloutTransformer", () => {
  const transformer = createMarkdownCalloutTransformer();

  it("コールアウトブロックをマークダウン形式に変換する", () => {
    const block = createCalloutBlock({
      richText: [
        createTextRichText({
          content: "テストメッセージ",
        }),
      ],
      icon: { type: "emoji", emoji: "🚨" },
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      > テストメッセージ
    `);
  });

  it("空のコールアウトブロックを変換する", () => {
    const block = createCalloutBlock({
      richText: [],
      icon: { type: "emoji", emoji: "🚨" },
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
    const block = createCalloutBlock({
      richText: [
        createTextRichText({
          content: "親メッセージ",
        }),
      ],
      icon: { type: "emoji", emoji: "📝" },
      children: [
        createCalloutBlock({
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

    context.mockedExecute.mockReturnValue("子メッセージ");
    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      > 親メッセージ
      > 子メッセージ
    `);
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
  });

  describe("annotationオプションありの場合", () => {
    const transformer = createMarkdownCalloutTransformer({
      enableAnnotations: {
        color: true,
      },
    });

    it("colorがtrueの場合、テキストの色を変更できる", () => {
      const block = createCalloutBlock({
        richText: [
          createTextRichText({
            content: "テストメッセージ",
            annotations: {
              color: "red",
            },
          }),
        ],
        icon: { type: "emoji", emoji: "🚨" },
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);

      const redColor = MarkdownUtils.COLOR_MAP.red as string;
      expect(result).toBe(dedent({ wrap: true })`
        > <span style="color: ${redColor};">テストメッセージ</span>
      `);
    });
  });
});
