import { MarkdownUtils, createCodeTransformerFactory } from "@notion-md-converter/core";
import type { CodeTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

type QiitaCodeMetadata = {
  diff: boolean;
};

export const createQiitaMarkdownCodeTransformer = (): CodeTransformer => {
  return createCodeTransformerFactory(
    ({ block, captionMetadata, context }) => {
      const metadata: QiitaCodeMetadata = {
        diff: captionMetadata.getMetadataValue("diff") === "true",
      };

      const codeText = context.tools.richTextFormatter.format(block.code.rich_text, {
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
        code: false,
        color: false,
      });
      const language = block.code.language;
      const filename = context.tools.richTextFormatter.plainText(captionMetadata.getText());

      return MarkdownUtils.wrapWithNewLines(
        QiitaMarkdownUtils.codeBlock(codeText, { diff: metadata.diff, language, filename }),
      );
    },
  );
};
