import {
  createCalloutBlock,
  createTextRichText,
  createTransformerContext,
  dedent,
} from "@notion-md-converter/testing";
import { createZennMarkdownCalloutTransformer } from "./createZennMarkdownCalloutTransformer";

describe("createZennMarkdownCalloutTransformer", () => {
  const transformer = createZennMarkdownCalloutTransformer();

  it("コールアウトブロックをZennのマークダウン形式に変換する", () => {
    const block = createCalloutBlock({
      richText: [
        createTextRichText({
          content: "テストメッセージ",
        }),
      ],
      icon: { type: "emoji", emoji: "💡" },
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      :::message
      テストメッセージ
      :::
    `);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.callout.rich_text);
  });

  it("アラートカラーが設定されている場合はアラートメッセージとして変換する", () => {
    const block = createCalloutBlock({
      richText: [
        createTextRichText({
          content: "アラートメッセージ",
        }),
      ],
      color: "red",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      :::message alert
      アラートメッセージ
      :::
    `);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.callout.rich_text);
  });

  it("子要素がある場合は子要素も変換する", () => {
    const block = createCalloutBlock({
      richText: [
        createTextRichText({
          content: "親メッセージ",
        }),
      ],
      color: "blue",
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
      :::message
      親メッセージ
      子メッセージ
      :::
    `);
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.callout.rich_text);
  });

  it("子要素に:::が含まれる場合、wrapオプションを有効にして変換する", () => {
    const block = createCalloutBlock({
      richText: [
        createTextRichText({
          content: "親メッセージ",
        }),
      ],
      icon: { type: "emoji", emoji: "💡" },
      children: [
        createCalloutBlock({
          richText: [
            createTextRichText({
              content: ":::message\n子メッセージ\n:::",
            }),
          ],
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue(dedent({ wrap: true })`
      :::message
      子メッセージ
      :::
    `);
    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      ::::message
      親メッセージ

      :::message
      子メッセージ
      :::

      ::::
    `);
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.callout.rich_text);
  });

  it("カスタムのアラートカラーを設定できる", () => {
    const transformer = createZennMarkdownCalloutTransformer({
      alertColors: ["red", "blue"],
    });
    const block = createCalloutBlock({
      richText: [
        createTextRichText({
          content: "アラートメッセージ",
        }),
      ],
      color: "blue",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      :::message alert
      アラートメッセージ
      :::
    `);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.callout.rich_text);
  });
});
