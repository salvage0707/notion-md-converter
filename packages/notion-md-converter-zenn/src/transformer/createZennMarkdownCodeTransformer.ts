import { MarkdownUtils, createCodeTransformerFactory } from "@notion-md-converter/core";
import type { CodeTransformer } from "@notion-md-converter/core/types";
import { ZennMarkdownUtils } from "../utils/markdown";

type ZennCodeMetadata = {
  diff?: string;
};

export const createZennMarkdownCodeTransformer = (): CodeTransformer => {
  return createCodeTransformerFactory(
    ({ block, metadata: { language, filename, ...metadata }, context }) => {
      const { diff } = metadata as ZennCodeMetadata;

      const text = context.tools.richTextFormatter.plainText(block.code.rich_text);

      return MarkdownUtils.wrapWithNewLines(
        ZennMarkdownUtils.codeBlock(text, diff === "true", language, filename),
      );
    },
  );
};
