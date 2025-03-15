import { MarkdownUtils } from "../utils";
import { createCodeTransformerFactory } from "./transformerFactory";

export const createMarkdownCodeTransformer = () => {
  return createCodeTransformerFactory(({ block }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.code.rich_text, {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: false,
    });
    const lang = block.code.language;
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.codeBlock(text, lang.replace(" ", "_")));
  });
};
