import type { FileAdapter } from "@notion-md-converter/types";
import { createNoChangeFileObjectAdapter } from "../adapter";
import { MarkdownUtils } from "../utils";
import { createFileTransformerFactory } from "./transformerFactory";

type FileTransformerOptions = {
  fileAdapter?: FileAdapter;
};

export const createMarkdownFileTransformer = (options: FileTransformerOptions = {}) => {
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
