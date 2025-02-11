import { createTextRichText, createToggleBlock } from "../test-helper";
import { createTransformerContext } from "../test-helper";
import { createMarkdownToggleTransformer } from "./createMarkdownToggleTransformer";

describe("createMarkdownToggleTransformer", () => {
  const transformer = createMarkdownToggleTransformer();

  it("toggleブロックを変換できる", () => {
    const block = createToggleBlock({
      richText: [
        createTextRichText({
          plainText: "test title",
        }),
      ],
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    context.mockedExecute.mockReturnValue("test content");
    const result = transformer(context);
    const expected = [
      "", // 改行
      "<details>",
      "  <summary>",
      "    test title",
      "  </summary>",
      "",
      "  test content",
      "</details>",
      "", // 改行
    ].join("\n");

    expect(result).toBe(expected);
  });
});
