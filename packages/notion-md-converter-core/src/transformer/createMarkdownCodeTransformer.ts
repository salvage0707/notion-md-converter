import type { CodeLanguageMapping } from "@notion-md-converter/types";
import { MarkdownUtils } from "../utils";
import { createCodeTransformerFactory } from "./transformerFactory";

type CodeTransformerOptions = {
  languageMapping?: CodeLanguageMapping;
};
export const createMarkdownCodeTransformer = (options: CodeTransformerOptions = {}) => {
  const { languageMapping } = options;
  return createCodeTransformerFactory(({ block }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.code.rich_text, {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: false,
    });
    const lang = languageMapping ? languageMapping[block.code.language] : block.code.language;
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.codeBlock(text, lang?.replace(" ", "_")));
  });
};
