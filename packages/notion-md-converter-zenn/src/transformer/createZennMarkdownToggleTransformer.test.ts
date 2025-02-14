import { createTextRichText, createToggleBlock, createTransformerContext } from "@notion-md-converter/core/test-helper";
import { createZennMarkdownToggleTransformer } from "./createZennMarkdownToggleTransformer";

describe("createZennMarkdownToggleTransformer", () => {
  const transformer = createZennMarkdownToggleTransformer();

  it("toggleブロックをZennのdetails記法に変換できる", () => {
    const block = createToggleBlock({
      richText: [
        createTextRichText({
          plainText: "テストタイトル",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("テストコンテンツ");
    const result = transformer(context);
    const expected = [
      "", // 改行
      ":::details テストタイトル",
      "テストコンテンツ",
      ":::",
      "", // 改行
    ].join("\n");

    expect(result).toBe(expected);
  });

  it("複数行のテキストを持つtoggleブロックを変換できる", () => {
    const block = createToggleBlock({
      richText: [
        createTextRichText({
          plainText: "タイトル1\nタイトル2",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("テストコンテンツ");
    const result = transformer(context);
    const expected = [
      "", // 改行
      ":::details タイトル1 タイトル2",
      "テストコンテンツ",
      ":::",
      "", // 改行
    ].join("\n");

    expect(result).toBe(expected);
  });

  it("子要素に:::が含まれる場合、内容を<br>でラップする", () => {
    const block = createToggleBlock({
      richText: [
        createTextRichText({
          plainText: "テストタイトル",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue(":::message\nメッセージ内容\n:::");
    const result = transformer(context);
    const expected = [
      "", // 改行
      "::::details テストタイトル",
      ":::message",
      "メッセージ内容",
      ":::",
      "::::",
      "", // 改行
    ].join("\n");

    expect(result).toBe(expected);
  });

  it("空のtoggleブロックを変換できる", () => {
    const block = createToggleBlock({
      richText: [
        createTextRichText({
          plainText: "テストタイトル",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("");
    const result = transformer(context);
    const expected = [
      "", // 改行
      ":::details テストタイトル",
      "",
      ":::",
      "", // 改行
    ].join("\n");

    expect(result).toBe(expected);
  });
});
