import {
  createCalloutBlock,
  createTextRichText,
  createTransformerContext,
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

    expect(result).toBe("\n:::message\nテストメッセージ\n:::\n");
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

    expect(result).toBe("\n:::message alert\nアラートメッセージ\n:::\n");
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

    expect(result).toBe("\n:::message\n親メッセージ\n子メッセージ\n:::\n");
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
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

    context.mockedExecute.mockReturnValue(":::message\n子メッセージ\n:::");
    const result = transformer(context);

    expect(result).toBe("\n::::message\n親メッセージ\n:::message\n子メッセージ\n:::\n::::\n");
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
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

    expect(result).toBe("\n:::message alert\nアラートメッセージ\n:::\n");
  });
});
