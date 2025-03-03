import { createBasicEquationTransformer, MarkdownUtils } from "@notion-md-converter/core";
import { QiitaMarkdownUtils } from "../utils";

export const createQiitaMarkdownEquationTransformer = () => {
  return createBasicEquationTransformer(({ block }) => {
    const text = block.equation.expression;
    return MarkdownUtils.wrapWithNewLines(
      QiitaMarkdownUtils.equationBlock(text),
    );
  });
};
