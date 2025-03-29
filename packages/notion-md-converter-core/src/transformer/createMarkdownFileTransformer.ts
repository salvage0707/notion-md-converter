import type { FileAdapter } from "@notion-md-converter/types";
import { createNoChangeFileObjectAdapter } from "../adapter";
import { type ColorMap, type EnableAnnotations, MarkdownUtils } from "../utils";
import { createFileTransformerFactory } from "./transformerFactory";

type FileTransformerOptions = {
  fileAdapter?: FileAdapter;
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownFileTransformer = (options: FileTransformerOptions = {}) => {
  const { enableAnnotations, colorMap } = options;

  return createFileTransformerFactory(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.file);
    const caption =
      block.file.caption.length > 0
        ? MarkdownUtils.richTextsToMarkdown(block.file.caption, enableAnnotations, colorMap)
        : block.file.name;
    return MarkdownUtils.link(caption, url);
  });
};
