import { MarkdownUtils, createCodeTransformerFactory } from "@notion-md-converter/core";
import type { CodeTransformer } from "@notion-md-converter/core/types";
import { ZennMarkdownUtils } from "../utils/markdown";

type ZennCodeMetadata = {
  diff?: string;
};

export const createZennMarkdownCodeTransformer = (): CodeTransformer => {
  return createCodeTransformerFactory(
    ({ block, metadata: { language, filename, ...metadata } }) => {
      const { diff } = metadata as ZennCodeMetadata;

      const text = MarkdownUtils.richTextsToMarkdown(block.code.rich_text, {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: false,
      });

      return MarkdownUtils.wrapWithNewLines(
        ZennMarkdownUtils.codeBlock(text, diff === "true", language, filename),
      );
    },
  );
};
