import { createEquationBlock, dedent } from "@notion-md-converter/testing";
import { createTransformerContext } from "@notion-md-converter/testing";
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
      expect(result).toBe(dedent({ wrap: true })`
        $$
        a = 1 + x
        $$
      `);
    });

    test("複雑な数式を変換できる", () => {
      const block = createEquationBlock({
        expression: "frac{1}{2} = int_{0}^{1} x dx",
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);
      expect(result).toBe(dedent({ wrap: true })`
        $$
        frac{1}{2} = int_{0}^{1} x dx
        $$
      `);
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
      expect(result).toBe(dedent({ wrap: true })`
        \`\`\`txt
        a = 1 + x
        \`\`\`
      `);
    });

    test("複雑な数式をコードブロックとして変換できる", () => {
      const block = createEquationBlock({
        expression: "\\frac{1}{2} = \\int_{0}^{1} x dx",
      });
      const context = createTransformerContext({
        blocks: [block],
      });

      const result = transformer(context);
      expect(result).toBe(dedent({ wrap: true })`
        \`\`\`txt
        \\frac{1}{2} = \\int_{0}^{1} x dx
        \`\`\`
      `);
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
    expect(result).toBe(dedent({ wrap: true })`
      $$

      $$
    `);
  });
});
