import { createTextRichText, createToDoBlock, dedent } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownTodoListItemTransformer } from "./createMarkdownTodoListItemTransformer";

describe("createMarkdownTodoListItemTransformer", () => {
  const transformer = createMarkdownTodoListItemTransformer();

  it("チェックボックスがtrueの場合はチェックボックスを表示する", () => {
    const block = createToDoBlock({
      richText: [
        createTextRichText({
          content: "テストテキスト",
        }),
      ],
      checked: true,
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("- [x] テストテキスト");
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.to_do.rich_text);
  });

  it("チェックボックスがfalseの場合はチェックボックスを表示しない", () => {
    const block = createToDoBlock({
      richText: [
        createTextRichText({
          content: "テストテキスト",
        }),
      ],
      checked: false,
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("- [ ] テストテキスト");
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.to_do.rich_text);
  });

  it("子要素がある場合は子要素も変換する", () => {
    const block = createToDoBlock({
      richText: [createTextRichText({ content: "テストテキスト" })],
      children: [
        createToDoBlock({
          richText: [createTextRichText({ content: "子テキスト" })],
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue(dedent`
      - [ ] 子テキスト
        - [x] 孫テキスト
    `);
    const result = transformer(context);

    expect(result).toBe(dedent`
      - [ ] テストテキスト
        - [ ] 子テキスト
          - [x] 孫テキスト
    `);
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.to_do.rich_text);
  });
});
