import { MarkdownUtils } from "../utils";
import { createParagraphTransformerFactory } from "./transformerFactory";

type ParagraphTransformerOptions = {
  br?: boolean;
}

export const createMarkdownParagraphTransformer = (options: ParagraphTransformerOptions = {}) => {
  const { br = false } = options;

  return createParagraphTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.paragraph.rich_text);
    const convertedMarkdown = children !== "" ? `${text}\n${children}` : text;
    return br ? `${convertedMarkdown}<br />` : convertedMarkdown;
  });
};
