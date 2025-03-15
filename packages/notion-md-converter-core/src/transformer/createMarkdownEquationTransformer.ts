import { MarkdownUtils } from "../utils";
import { createEquationTransformerFactory } from "./transformerFactory";

export const createMarkdownEquationTransformer = ({
  type = "equation",
}: { type?: "code" | "equation" } = {}) => {
  return createEquationTransformerFactory(({ block }) => {
    const text = block.equation.expression;
    return MarkdownUtils.wrapWithNewLines(
      type === "code" ? MarkdownUtils.codeBlock(text, "txt") : MarkdownUtils.blockEquation(text),
    );
  });
};
