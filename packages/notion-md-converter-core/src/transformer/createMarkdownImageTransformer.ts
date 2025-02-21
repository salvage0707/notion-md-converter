import type { FileAdapter } from "@notion-md-converter/types";
import { createNoChangeFileObjectAdapter } from "../adapter";
import { MarkdownUtils } from "../utils";
import { createBasicImageTransformer } from "./createBasicTransformer";

export const createMarkdownImageTransformer = (
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
