import {
  createBasicImageTransformer,
  createNoChangeFileObjectAdapter,
  MarkdownUtils,
} from "@notion-md-converter/core";
import type { FileAdapter } from "@notion-md-converter/core/types";

export const createZennMarkdownImageTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createBasicImageTransformer(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.image);
    const caption =
      block.image.caption.length > 0 ? MarkdownUtils.richTextsToMarkdown(block.image.caption) : url;
    return MarkdownUtils.image(caption ?? url, url);
  });
};
