import {
  createTextRichText,
  createToggleBlock,
  createTransformerContext,
  dedent,
} from "@notion-md-converter/testing";
import { createZennMarkdownToggleTransformer } from "./createZennMarkdownToggleTransformer";

describe("createZennMarkdownToggleTransformer", () => {
  const transformer = createZennMarkdownToggleTransformer();

  it("toggleブロックをZennのdetails記法に変換できる", () => {
    const block = createToggleBlock({
      richText: [
        createTextRichText({
          content: "テストタイトル",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("テストコンテンツ");
    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      :::details テストタイトル
      テストコンテンツ
      :::
    `);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.toggle.rich_text);
  });

  it("複数行のテキストを持つtoggleブロックを変換できる", () => {
    const block = createToggleBlock({
      richText: [
        createTextRichText({
          content: "タイトル1\nタイトル2",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("テストコンテンツ");
    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      :::details タイトル1 タイトル2
      テストコンテンツ
      :::
    `);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.toggle.rich_text);
  });

  it("子要素に:::が含まれる場合、内容を<br>でラップする", () => {
    const block = createToggleBlock({
      richText: [
        createTextRichText({
          content: "テストタイトル",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue(dedent({ wrap: true })`
      :::message
      メッセージ内容
      :::
    `);
    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      ::::details テストタイトル

      :::message
      メッセージ内容
      :::

      ::::
    `);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.toggle.rich_text);
  });

  it("空のtoggleブロックを変換できる", () => {
    const block = createToggleBlock({
      richText: [
        createTextRichText({
          content: "テストタイトル",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("");
    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      :::details テストタイトル

      :::
    `);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.toggle.rich_text);
  });
});
