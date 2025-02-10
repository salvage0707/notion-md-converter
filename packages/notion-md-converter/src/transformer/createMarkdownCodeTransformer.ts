import { MarkdownUtils } from "../utils";
import { createBasicCodeTransformer } from "./createBasicTransformer";

export const createMarkdownCodeTransformer = () => {
  return createBasicCodeTransformer(({ block }) => {
    const text = MarkdownUtils.convertRichTextsToMarkdown(
      block.code.rich_text,
      {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: false,
      }
    );
    const lang = block.code.language;
    return MarkdownUtils.wrapWithNewLines(
      MarkdownUtils.convertToCodeBlock(text, lang.replace(" ", "_"))
    );
  });
};
