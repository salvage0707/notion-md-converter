import {
  MarkdownUtils,
  createBasicImageTransformer,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter, ImageTransformer } from "@notion-md-converter/core/types";

export const createZennMarkdownImageTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): ImageTransformer => {
  return createBasicImageTransformer(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.image);
    const caption =
      block.image.caption.length > 0 ? MarkdownUtils.richTextsToMarkdown(block.image.caption) : url;
    return MarkdownUtils.image(caption ?? url, url);
  });
};
