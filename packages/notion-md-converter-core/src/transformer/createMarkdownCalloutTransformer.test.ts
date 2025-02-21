import {
  createCalloutBlock,
  createTextRichText,
  createTransformerContext,
} from "@notion-md-converter/testing";
import { createMarkdownCalloutTransformer } from "./createMarkdownCalloutTransformer";

describe("createMarkdownCalloutTransformer", () => {
  const transformer = createMarkdownCalloutTransformer();

  it("コールアウトブロックをマークダウン形式に変換する", () => {
    const block = createCalloutBlock({
      richText: [
        createTextRichText({
          plainText: "テストメッセージ",
        }),
      ],
      icon: { type: "emoji", emoji: "🚨" },
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("\n> テストメッセージ\n");
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

    expect(result).toBe("\n> \n");
  });

  it("子要素がある場合は子要素も変換する", () => {
    const block = createCalloutBlock({
      richText: [
        createTextRichText({
          plainText: "親メッセージ",
        }),
      ],
      icon: { type: "emoji", emoji: "📝" },
      children: [
        createCalloutBlock({
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

    context.mockedExecute.mockReturnValue("子メッセージ");
    const result = transformer(context);

    expect(result).toBe("\n> 親メッセージ\n> 子メッセージ\n");
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
  });
});
