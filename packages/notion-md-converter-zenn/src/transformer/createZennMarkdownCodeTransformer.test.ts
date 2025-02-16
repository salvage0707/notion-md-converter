import {
  createCodeBlock,
  createTextRichText,
  createTransformerContext,
} from "@notion-md-converter/core/test-helper";
import { createZennMarkdownCodeTransformer } from "./createZennMarkdownCodeTransformer";

describe("createZennMarkdownCodeTransformer", () => {
  const transformer = createZennMarkdownCodeTransformer();

  it("コードブロックをZennのマークダウン形式に変換する", () => {
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

    expect(result).toBe("\n```\ntest hoge\n```\n");
  });

  it("diffが指定されている場合、それを含めて変換する", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          plainText: "test hoge",
        }),
      ],
      language: "javascript",
      caption: [
        createTextRichText({
          plainText: "diff:",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("\n```diff javascript\ntest hoge\n```\n");
  });

  it("diffとファイル名が指定されている場合、それらを含めて変換する", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          plainText: "test hoge",
        }),
      ],
      language: "javascript",
      caption: [
        createTextRichText({
          plainText: "diff:hello.js",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe("\n```diff javascript:hello.js\ntest hoge\n```\n");
  });

  it("リッチテキストの装飾は無視される", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          plainText: "test hoge",
          annotations: {
            bold: true,
            italic: true,
            strikethrough: true,
            underline: true,
            code: true,
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
});
