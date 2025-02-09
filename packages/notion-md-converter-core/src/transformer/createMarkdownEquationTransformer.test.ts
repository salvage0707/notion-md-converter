import { createEquationBlock } from "../test-helper";
import { createTransformerContext } from "../test-helper";
import { createMarkdownEquationTransformer } from "./createMarkdownEquationTransformer";

describe("createMarkdownEquationTransformer", () => {
  const transformer = createMarkdownEquationTransformer();

  test("equationブロックを変換できる", () => {
    const block = createEquationBlock({
      expression: "a = 1 + x",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("\n```txt\na = 1 + x\n```\n");
  });
});
