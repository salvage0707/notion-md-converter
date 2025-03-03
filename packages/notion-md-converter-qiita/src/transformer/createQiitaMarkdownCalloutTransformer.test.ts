import {
  createCalloutBlock,
  createTextRichText,
  createTransformerContext,
  dedent,
} from "@notion-md-converter/testing";
import { createQiitaMarkdownCalloutTransformer } from "./createQiitaMarkdownCalloutTransformer";

describe("createQiitaMarkdownCalloutTransformer", () => {
  const transformer = createQiitaMarkdownCalloutTransformer();

  it("コールアウトブロックをQiitaのNote記法に変換する", () => {
    const block = createCalloutBlock({
      icon: { type: "emoji", emoji: "💡" },
      richText: [
        createTextRichText({
          content: "テストメッセージ",
        }),
      ],
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
      :::note info
      テストメッセージ
      子メッセージ
      :::
    `);
  });

  it("warnカラーが設定されている場合はwarnメッセージとして出力する", () => {
    const block = createCalloutBlock({
      richText: [
        createTextRichText({
          content: "アラートメッセージ",
        }),
      ],
      color: "yellow_background",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      :::note warn
      アラートメッセージ
      :::
    `);
  });

  it("カスタムのアラートカラーを設定できる", () => {
    const transformer = createQiitaMarkdownCalloutTransformer({
      warnColors: ["blue"],
      alertColors: ["brown"],
    });
    const blueBlock = createCalloutBlock({
      richText: [
        createTextRichText({
          content: "メッセージ",
        }),
      ],
      color: "blue",
    });
    const brownBlock = createCalloutBlock({
      richText: [
        createTextRichText({
          content: "メッセージ",
        }),
      ],
      color: "brown"
    });
    const blueContext = createTransformerContext({
      blocks: [blueBlock,],
    });
    const brownContext = createTransformerContext({
      blocks: [brownBlock],
    });

    const blueResult = transformer(blueContext);
    const brownResult = transformer(brownContext);

    expect(blueResult).toBe(dedent({ wrap: true })`
      :::note warn
      メッセージ
      :::
    `);
    expect(brownResult).toBe(dedent({ wrap: true })`
      :::note alert
      メッセージ
      :::
    `);
  });
});
