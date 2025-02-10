import { createCodeBlock, createTextRichText, createTransformerContext } from "../test-helper";
import { createMarkdownCodeTransformer } from "./createMarkdownCodeTransformer";

describe("createMarkdownCodeTransformer", () => {
  const transformer = createMarkdownCodeTransformer();

  it("コードブロックをマークダウン形式に変換する", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          root: {
            plain_text: "test hoge",
          },
        }),
      ],
      language: "javascript",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("\n```javascript\ntest hoge\n```\n");
  });

  it("言語指定がない場合は言語なしで変換する", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          root: {
            plain_text: "test hoge",
          },
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("\n```plain_text\ntest hoge\n```\n");
  });
});
