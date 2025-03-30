import { MarkdownUtils, createCodeTransformerFactory } from "@notion-md-converter/core";
import type { CodeTransformer } from "@notion-md-converter/core/types";
import { ZennMarkdownUtils } from "../utils/markdown";

type ZennCodeMetadata = {
  diff: boolean;
};

export const createZennMarkdownCodeTransformer = (): CodeTransformer => {
  return createCodeTransformerFactory(({ block, captionMetadata, context }) => {
    const metadata: ZennCodeMetadata = {
      diff: captionMetadata.getMetadataValue("diff") === "true",
    };

    const codeText = context.tools.richTextFormatter.plainText(block.code.rich_text);
    const language = block.code.language;
    const filename = context.tools.richTextFormatter.plainText(captionMetadata.getText());

    return MarkdownUtils.wrapWithNewLines(
      ZennMarkdownUtils.codeBlock(codeText, metadata.diff, language, filename),
    );
  });
};
