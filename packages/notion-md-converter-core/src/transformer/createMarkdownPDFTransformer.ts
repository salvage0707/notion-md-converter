import { createNoChangeFileObjectAdapter } from "../adapter";
import type { FileAdapter } from "../types";
import { MarkdownUtils } from "../utils";
import { createBasicPDFTransformer } from "./createBasicTransformer";

export const createMarkdownPDFTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createBasicPDFTransformer(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.pdf);
    const caption =
      block.pdf.caption.length > 0 ? MarkdownUtils.richTextsToMarkdown(block.pdf.caption) : url;
    return `[${caption}](${url})`;
  });
};
