import {
  MarkdownUtils,
  createPDFTransformerFactory,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter, PDFTransformer } from "@notion-md-converter/core/types";

export const createZennMarkdownPDFTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): PDFTransformer => {
  return createPDFTransformerFactory(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.pdf);
    const caption =
      block.pdf.caption.length > 0 ? MarkdownUtils.richTextsToMarkdown(block.pdf.caption) : url;
    return `[${caption}](${url})`;
  });
};
