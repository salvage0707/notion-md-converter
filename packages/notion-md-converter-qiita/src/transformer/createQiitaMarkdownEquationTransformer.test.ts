import { createEquationBlock, dedent } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
import { createQiitaMarkdownEquationTransformer } from "./createQiitaMarkdownEquationTransformer";

describe("createQiitaMarkdownEquationTransformer", () => {
  const transformer = createQiitaMarkdownEquationTransformer();

  test("数式ブロックを変換できる", () => {
    const block = createEquationBlock({
      expression: "a = 1 + x",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe(dedent({ wrap: true })`
        \`\`\`math
        a = 1 + x
        \`\`\`
      `);
  });
});
