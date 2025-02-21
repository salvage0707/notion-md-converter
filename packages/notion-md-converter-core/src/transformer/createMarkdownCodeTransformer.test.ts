import { createCodeBlock, createTextRichText, createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownCodeTransformer } from "./createMarkdownCodeTransformer";

describe("createMarkdownCodeTransformer", () => {
  const transformer = createMarkdownCodeTransformer();

  it("コードブロックをマークダウン形式に変換する", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          plainText: "test hoge",
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
          plainText: "test hoge",
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
