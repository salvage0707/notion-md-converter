import type { FileAdapter } from "@notion-md-converter/types";
import { MarkdownUtils } from "../utils";
import { createFileTransformerFactory } from "./transformerFactory";
import { createNoChangeFileObjectAdapter } from "../adapter";

type FileTransformerOptions = {
  fileAdapter?: FileAdapter;
};

export const createMarkdownFileTransformer = (options: FileTransformerOptions = {}) => {
  const { fileAdapter } = options;

  return createFileTransformerFactory(({ block, context }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.file);
    const caption =
      block.file.caption.length > 0
        ? context.tools.richTextFormatter.format(block.file.caption)
        : block.file.name;
    return MarkdownUtils.link(caption, url);
  });
};
