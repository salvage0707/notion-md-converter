import { MarkdownUtils } from "../utils";
import { createBasicEquationTransformer } from "./createBasicTransformer";

export const createMarkdownEquationTransformer = ({ type = "equation" }: { type?: "code" | "equation" } = {}) => {
  return createBasicEquationTransformer(({ block }) => {
    const text = block.equation.expression;
    return MarkdownUtils.wrapWithNewLines(
      type === "code" ? MarkdownUtils.codeBlock(text, "txt") : MarkdownUtils.blockEquation(text),
    );
  });
};
