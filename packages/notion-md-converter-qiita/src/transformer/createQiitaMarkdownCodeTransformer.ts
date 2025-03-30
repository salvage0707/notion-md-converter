import { MarkdownUtils, createCodeTransformerFactory } from "@notion-md-converter/core";
import type { CodeTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

type QiitaCodeMetadata = {
  diff?: string;
};

export const createQiitaMarkdownCodeTransformer = (): CodeTransformer => {
  return createCodeTransformerFactory(
    ({ block, metadata: { language, filename, ...metadata }, context }) => {
      const { diff } = metadata as QiitaCodeMetadata;

      const text = context.tools.richTextFormatter.format(block.code.rich_text, {
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
    },
  );
};
