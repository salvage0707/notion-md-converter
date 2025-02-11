import { createTextRichText, createToDoBlock } from "../test-helper";
import { createTransformerContext } from "../test-helper";
import { createMarkdownTodoListItemTransformer } from "./createMarkdownTodoListItemTransformer";

describe("createMarkdownTodoListItemTransformer", () => {
  const transformer = createMarkdownTodoListItemTransformer();

  it("チェックボックスがtrueの場合はチェックボックスを表示する", () => {
    const block = createToDoBlock({
      richText: [
        createTextRichText({
          plainText: "テストテキスト",
        }),
      ],
      checked: true,
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("- [x] テストテキスト");
  });

  it("チェックボックスがfalseの場合はチェックボックスを表示しない", () => {
    const block = createToDoBlock({
      richText: [
        createTextRichText({
          plainText: "テストテキスト",
        }),
      ],
      checked: false,
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("- [ ] テストテキスト");
  });

  it("子要素がある場合は子要素も変換する", () => {
    const block = createToDoBlock({
      richText: [createTextRichText({ plainText: "テストテキスト" })],
      children: [
        createToDoBlock({
          richText: [createTextRichText({ plainText: "子テキスト" })],
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("- [ ] 子テキスト\n  - [x] 孫テキスト");
    const result = transformer(context);

    expect(result).toBe("- [ ] テストテキスト\n  - [ ] 子テキスト\n    - [x] 孫テキスト");
    expect(context.mockedExecute).toHaveBeenCalledWith(block.children);
  });
});
