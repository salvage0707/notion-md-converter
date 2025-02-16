import { MarkdownUtils, createBasicCodeTransformer } from "@notion-md-converter/core";
import { ZennMarkdownUtils } from "../utils/markdown";
import type { CodeTransformer } from "@notion-md-converter/core/types";

export const createZennMarkdownCodeTransformer = (): CodeTransformer => {
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
