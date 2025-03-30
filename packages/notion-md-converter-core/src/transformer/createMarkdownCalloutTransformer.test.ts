import {
  CHAR,
  createCalloutBlock,
  createTextRichText,
  createTransformerContext,
  dedent,
} from "@notion-md-converter/testing";
import { createMarkdownCalloutTransformer } from "./createMarkdownCalloutTransformer";

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
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.callout.rich_text);
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
});
