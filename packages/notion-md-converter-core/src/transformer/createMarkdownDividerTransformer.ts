import { MarkdownUtils } from "../utils";
import { createDividerTransformerFactory } from "./transformerFactory";

export const createMarkdownDividerTransformer = () => {
  return createDividerTransformerFactory(() =>
    MarkdownUtils.wrapWithNewLines(MarkdownUtils.horizontalRule()),
  );
};
