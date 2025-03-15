import type { FileAdapter } from "@notion-md-converter/types";
import { createNoChangeFileObjectAdapter } from "../adapter";
import { MarkdownUtils } from "../utils";
import { createFileTransformerFactory } from "./transformerFactory";

export const createMarkdownFileTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createFileTransformerFactory(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.file);
    const caption =
      block.file.caption.length > 0
        ? MarkdownUtils.richTextsToMarkdown(block.file.caption)
        : block.file.name;
    return MarkdownUtils.link(caption, url);
  });
};
