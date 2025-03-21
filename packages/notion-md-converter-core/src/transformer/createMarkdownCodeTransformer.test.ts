import {
  createCodeBlock,
  createTextRichText,
  createTransformerContext,
  dedent,
} from "@notion-md-converter/testing";
import type { CodeLanguageMapping } from "@notion-md-converter/types";
import { createMarkdownCodeTransformer } from "./createMarkdownCodeTransformer";

describe("createMarkdownCodeTransformer", () => {
  const transformer = createMarkdownCodeTransformer();

  it("コードブロックをマークダウン形式に変換する", () => {
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
      \`\`\`plain_text
      test hoge
      \`\`\`
    `);
  });

  it("langage mappingが指定されている場合は言語を変換する", () => {
    const transformer = createMarkdownCodeTransformer({
      languageMapping: {
        javascript: "custom_js",
      } as CodeLanguageMapping,
    });
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
      \`\`\`custom_js
      test hoge
      \`\`\`
    `);
  });
});
