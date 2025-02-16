import {
  MarkdownUtils,
  createBasicFileTransformer,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter, FileTransformer } from "@notion-md-converter/core/types";

// TODO: 実装
export const createZennMarkdownFileTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): FileTransformer => {
  return createBasicFileTransformer(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.file);
    const caption =
      block.file.caption.length > 0
        ? MarkdownUtils.richTextsToMarkdown(block.file.caption)
        : block.file.name;
    return MarkdownUtils.link(caption, url);
  });
};
