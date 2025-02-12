import { createBasicCodeTransformer, MarkdownUtils } from "@notion-md-converter/core";
import { ZennMarkdownUtils } from "src/utils/markdown";

export const createZennMarkdownCodeTransformer = () => {
  return createBasicCodeTransformer(({ block, meta: { diff, language, filename } }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.code.rich_text, {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: false,
    });
    return MarkdownUtils.wrapWithNewLines(
      ZennMarkdownUtils.codeBlock(text, diff, language, filename),
    );
  });
};
