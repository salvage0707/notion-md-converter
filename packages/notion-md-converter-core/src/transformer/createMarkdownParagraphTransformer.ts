import { MarkdownUtils } from "../utils";
import { createParagraphTransformerFactory } from "./transformerFactory";

export const createMarkdownParagraphTransformer = () => {
  return createParagraphTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.paragraph.rich_text);
    if (children !== "") {
      return `${text}\n${children}`;
    }
    return text;
  });
};
