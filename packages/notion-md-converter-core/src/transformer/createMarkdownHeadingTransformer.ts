import { MarkdownUtils } from "../utils";
import { createBasicHeadingTransformer } from "./createBasicTransformer";

export const createMarkdownHeadingTransformer = () => {
  return createBasicHeadingTransformer(({ level, richText }) => {
    const text = MarkdownUtils.richTextsToMarkdown(richText);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.heading(text, level));
  });
};
