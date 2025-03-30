import {
  createNoChangeFileObjectAdapter,
  createPDFTransformerFactory,
} from "@notion-md-converter/core";
import type { FileAdapter, PDFTransformer } from "@notion-md-converter/core/types";

export const createZennMarkdownPDFTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): PDFTransformer => {
  return createPDFTransformerFactory(({ block, context }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.pdf);
    const caption =
      block.pdf.caption.length > 0
        ? context.tools.richTextFormatter.format(block.pdf.caption)
        : url;
    return `[${caption}](${url})`;
  });
};
