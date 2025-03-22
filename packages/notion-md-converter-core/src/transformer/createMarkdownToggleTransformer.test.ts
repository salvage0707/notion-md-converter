import { createTextRichText, createToggleBlock, dedent } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownToggleTransformer } from "./createMarkdownToggleTransformer";
import { MarkdownUtils } from "../utils";

describe("createMarkdownToggleTransformer", () => {
  const transformer = createMarkdownToggleTransformer();

  it("toggleブロックを変換できる", () => {
    const block = createToggleBlock({
      richText: [
        createTextRichText({
          content: "test title",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("test content");
    const result = transformer(context);

    expect(result).toBe(dedent({ wrap: true })`
      <details>
      <summary>
      test title
      </summary>

      test content
      </details>
    `);
  });

  describe("annotationオプションありの場合", () => {
    const transformer = createMarkdownToggleTransformer({
      enableAnnotations: {
        color: true,
      },
    });

    it("colorがtrueの場合、テキストの色を変更できる", () => {
      const block = createToggleBlock({
        richText: [
          createTextRichText({
            content: "test title",
            annotations: {
              color: "red",
            },
          }),
        ],
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      context.mockedExecute.mockReturnValue("test content");
      const result = transformer(context);

      const redColor = MarkdownUtils.COLOR_MAP.red as string;
      expect(result).toBe(dedent({ wrap: true })`
      <details>
      <summary>
      <span style="color: ${redColor};">test title</span>
      </summary>

      test content
      </details>
    `);
    });
  });
});
