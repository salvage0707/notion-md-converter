import {
  createCodeBlock,
  createTextRichText,
  createTransformerContext,
  dedent,
} from "@notion-md-converter/testing";
import { createZennMarkdownCodeTransformer } from "./createZennMarkdownCodeTransformer";

describe("createZennMarkdownCodeTransformer", () => {
  const transformer = createZennMarkdownCodeTransformer();

  it("コードブロックをZennのマークダウン形式に変換する", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          content: "test hoge",
        }),
      ],
      language: "javascript",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      \`\`\`javascript
      test hoge
      \`\`\`
    `);
    expect(context.tools.richTextFormatter.plainText).toHaveBeenCalledWith(block.code.rich_text);
  });

  it("言語指定がない場合は言語なしで変換する", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          content: "test hoge",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      \`\`\`
      test hoge
      \`\`\`
    `);
    expect(context.tools.richTextFormatter.plainText).toHaveBeenCalledWith(block.code.rich_text);
  });

  it("diffが指定されている場合、それを含めて変換する", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          content: "test hoge",
        }),
      ],
      language: "javascript",
      caption: [
        createTextRichText({
          content: "diff=true:",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      \`\`\`diff javascript
      test hoge
      \`\`\`
    `);
    expect(context.tools.richTextFormatter.plainText).toHaveBeenCalledWith(block.code.rich_text);
  });

  it("diffとファイル名が指定されている場合、それらを含めて変換する", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          content: "test hoge",
        }),
      ],
      language: "javascript",
      caption: [
        createTextRichText({
          content: "diff=true:hello.js",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      \`\`\`diff javascript:hello.js
      test hoge
      \`\`\`
    `);
  });

  it("リッチテキストの装飾は無視される", () => {
    const block = createCodeBlock({
      richText: [
        createTextRichText({
          content: "test hoge",
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

    expect(result).toBe(dedent({ wrap: true })`
      \`\`\`javascript
      test hoge
      \`\`\`
    `);
  });
});
