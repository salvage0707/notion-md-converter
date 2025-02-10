import type { FileAdaptor } from "../adaptors";
import { NoChangeFileObjectAdaptor } from "../adaptors";
import { MarkdownUtils } from "../utils";
import { createBasicPdfTransformer } from "./createBasicTransformer";

export const createMarkdownPdfTransformer = (
  options: {
    fileAdaptor?: FileAdaptor;
  } = {},
) => {
  return createBasicPdfTransformer(({ block }) => {
    const fileAdaptor = options.fileAdaptor ?? new NoChangeFileObjectAdaptor();
    const { url } = fileAdaptor.execute(block.pdf);
    const caption =
      block.pdf.caption.length > 0
        ? MarkdownUtils.convertRichTextsToMarkdown(block.pdf.caption)
        : url;
    return `[${caption}](${url})`;
  });
};
