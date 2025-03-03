import { MarkdownUtils, createBasicCodeTransformer } from "@notion-md-converter/core";
import type { CodeTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

type QiitaCodeMetadata = {
  diff?: string;
};

export const createQiitaMarkdownCodeTransformer = (): CodeTransformer => {
  return createBasicCodeTransformer(({ block, metadata: { language, filename, ...metadata } }) => {
    const { diff } = metadata as QiitaCodeMetadata;

    const text = MarkdownUtils.richTextsToMarkdown(block.code.rich_text, {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: false,
    });

    return MarkdownUtils.wrapWithNewLines(
      QiitaMarkdownUtils.codeBlock(text, { diff: diff === "true", language, filename }),
    );
  });
};
