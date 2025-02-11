import type { FileAdapter } from "../types";
import { createNoChangeFileObjectAdaptor } from "../adaptors";
import { MarkdownUtils } from "../utils";
import { createBasicFileTransformer } from "./createBasicTransformer";

export const createMarkdownFileTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createBasicFileTransformer(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdaptor();
    const { url } = fileAdapter(block.file);
    const caption =
      block.file.caption.length > 0
        ? MarkdownUtils.richTextsToMarkdown(block.file.caption)
        : block.file.name;
    return MarkdownUtils.link(caption, url);
  });
};
