import {
  MarkdownUtils,
  createBasicPdfTransformer,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter } from "@notion-md-converter/core/types";

export const createZennMarkdownPDFTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createBasicPdfTransformer(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.pdf);
    const caption =
      block.pdf.caption.length > 0 ? MarkdownUtils.richTextsToMarkdown(block.pdf.caption) : url;
    return `[${caption}](${url})`;
  });
};
