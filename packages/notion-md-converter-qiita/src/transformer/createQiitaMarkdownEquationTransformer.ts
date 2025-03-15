import { MarkdownUtils, createEquationTransformerFactory } from "@notion-md-converter/core";
import { QiitaMarkdownUtils } from "../utils";

export const createQiitaMarkdownEquationTransformer = () => {
  return createEquationTransformerFactory(({ block }) => {
    const text = block.equation.expression;
    return MarkdownUtils.wrapWithNewLines(QiitaMarkdownUtils.equationBlock(text));
  });
};
