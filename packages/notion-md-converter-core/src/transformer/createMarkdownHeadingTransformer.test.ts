import {
  createHeading1Block,
  createHeading2Block,
  createHeading3Block,
  createTextRichText,
} from "../test-helper";
import { createTransformerContext } from "../test-helper";
import { createMarkdownHeadingTransformer } from "./createMarkdownHeadingTransformer";

describe("createMarkdownHeadingTransformer", () => {
  const transformer = createMarkdownHeadingTransformer();

  it("heading_1ブロックを変換できる", () => {
    const block = createHeading1Block({
      richText: [
        createTextRichText({
          root: {
            plain_text: "見出し1",
          },
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("\n# 見出し1\n");
  });

  it("heading_2ブロックを変換できる", () => {
    const block = createHeading2Block({
      richText: [
        createTextRichText({
          root: {
            plain_text: "見出し2",
          },
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("\n## 見出し2\n");
  });

  it("heading_3ブロックを変換できる", () => {
    const block = createHeading3Block({
      richText: [
        createTextRichText({
          root: {
            plain_text: "見出し3",
          },
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("\n### 見出し3\n");
  });
});
