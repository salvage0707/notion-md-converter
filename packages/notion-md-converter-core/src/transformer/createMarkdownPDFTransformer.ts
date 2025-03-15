import type { FileAdapter } from "@notion-md-converter/types";
import { createNoChangeFileObjectAdapter } from "../adapter";
import { MarkdownUtils } from "../utils";
import { createPDFTransformerFactory } from "./transformerFactory";

export const createMarkdownPDFTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createPDFTransformerFactory(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.pdf);
    const caption =
      block.pdf.caption.length > 0 ? MarkdownUtils.richTextsToMarkdown(block.pdf.caption) : url;
    return `[${caption}](${url})`;
  });
};
