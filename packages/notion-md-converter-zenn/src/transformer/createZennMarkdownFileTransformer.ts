import { createBasicFileTransformer, createNoChangeFileObjectAdapter, MarkdownUtils } from "@notion-md-converter/core";
import type { FileAdapter } from "@notion-md-converter/core/types";

// TODO: 実装
export const createZennMarkdownFileTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createBasicFileTransformer(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.file);
    const caption =
      block.file.caption.length > 0 ? MarkdownUtils.richTextsToMarkdown(block.file.caption) : block.file.name;
    return MarkdownUtils.link(caption, url);
  });
};
