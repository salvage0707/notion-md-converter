import { MarkdownUtils } from "../utils";
import { createHeadingTransformerFactory } from "./transformerFactory";

export const createMarkdownHeadingTransformer = () => {
  return createHeadingTransformerFactory(({ level, richText, context }) => {
    const text = context.tools.richTextFormatter.format(richText);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.heading(text, level));
  });
};
