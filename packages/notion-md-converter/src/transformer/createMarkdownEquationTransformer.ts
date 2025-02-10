import { MarkdownUtils } from "../utils";
import { createBasicEquationTransformer } from "./createBasicTransformer";

export const createMarkdownEquationTransformer = () => {
  return createBasicEquationTransformer(({ block }) => {
    const text = block.equation.expression;
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.codeBlock(text, "txt"));
  });
};
