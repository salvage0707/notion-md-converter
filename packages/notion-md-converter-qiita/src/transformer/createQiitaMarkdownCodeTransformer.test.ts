import {
  createCodeBlock,
  createTextRichText,
  createTransformerContext,
  dedent,
} from "@notion-md-converter/testing";
import { createQiitaMarkdownCodeTransformer } from "./createQiitaMarkdownCodeTransformer";

describe("createQiitaMarkdownCodeTransformer", () => {
  const transformer = createQiitaMarkdownCodeTransformer();

  it("コードブロックをQiitaのコードブロック形式に変換する", () => {
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
  });

  it("言語指定がない場合はplaintextで変換する", () => {
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
      \`\`\`plaintext
      test hoge
      \`\`\`
    `);
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
      \`\`\`diff_javascript
      test hoge
      \`\`\`
    `);
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
      \`\`\`diff_javascript:hello.js
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
