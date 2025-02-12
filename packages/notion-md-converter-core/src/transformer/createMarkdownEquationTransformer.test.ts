import { createEquationBlock } from "../test-helper";
import { createTransformerContext } from "../test-helper";
import { createMarkdownEquationTransformer } from "./createMarkdownEquationTransformer";

describe("createMarkdownEquationTransformer", () => {
  describe("デフォルトの動作（equation type）", () => {
    const transformer = createMarkdownEquationTransformer();

    test("数式ブロックを変換できる", () => {
      const block = createEquationBlock({
        expression: "a = 1 + x",
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);
      expect(result).toBe("\n$$\na = 1 + x\n$$\n");
    });

    test("複雑な数式を変換できる", () => {
      const block = createEquationBlock({
        expression: "\\frac{1}{2} = \\int_{0}^{1} x dx",
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);
      expect(result).toBe("\n$$\n\\frac{1}{2} = \\int_{0}^{1} x dx\n$$\n");
    });
  });

  describe("code typeの場合", () => {
    const transformer = createMarkdownEquationTransformer({ type: "code" });

    test("数式ブロックをコードブロックとして変換できる", () => {
      const block = createEquationBlock({
        expression: "a = 1 + x",
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);
      expect(result).toBe("\n```txt\na = 1 + x\n```\n");
    });

    test("複雑な数式をコードブロックとして変換できる", () => {
      const block = createEquationBlock({
        expression: "\\frac{1}{2} = \\int_{0}^{1} x dx",
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);
      expect(result).toBe("\n```txt\n\\frac{1}{2} = \\int_{0}^{1} x dx\n```\n");
    });
  });

  test("空の数式ブロックを変換できる", () => {
    const transformer = createMarkdownEquationTransformer();
    const block = createEquationBlock({
      expression: "",
    });
    const context = createTransformerContext({
      blocks: [block],
    });

    const result = transformer(context);
    expect(result).toBe("\n$$\n\n$$\n");
  });
});
