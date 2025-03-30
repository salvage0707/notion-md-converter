import { createTextRichText, createToggleBlock, dedent } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createMarkdownToggleTransformer } from "./createMarkdownToggleTransformer";

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
    expect(context.tools.richTextFormatter.format).toHaveBeenCalledWith(block.toggle.rich_text);
  });
});
