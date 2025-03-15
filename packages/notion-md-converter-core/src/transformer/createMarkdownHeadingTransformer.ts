import { MarkdownUtils } from "../utils";
import { createHeadingTransformerFactory } from "./transformerFactory";

export const createMarkdownHeadingTransformer = () => {
  return createHeadingTransformerFactory(({ level, richText }) => {
    const text = MarkdownUtils.richTextsToMarkdown(richText);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.heading(text, level));
  });
};
