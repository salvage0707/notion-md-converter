import { MarkdownUtils, createBasicCodeTransformer } from "@notion-md-converter/core";
import type { CodeTransformer } from "@notion-md-converter/core/types";
import { ZennMarkdownUtils } from "../utils/markdown";

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
