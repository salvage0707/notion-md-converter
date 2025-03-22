import { type ColorMap, type EnableAnnotations, MarkdownUtils } from "../utils";
import { createHeadingTransformerFactory } from "./transformerFactory";

type HeadingTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownHeadingTransformer = (options: HeadingTransformerOptions = {}) => {
  const { enableAnnotations, colorMap } = options;
  return createHeadingTransformerFactory(({ level, richText }) => {
    const text = MarkdownUtils.richTextsToMarkdown(richText, enableAnnotations, colorMap);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.heading(text, level));
  });
};
