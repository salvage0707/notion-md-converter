import type { FileAdaptor } from "../adaptors";
import { NoChangeFileObjectAdaptor } from "../adaptors";
import { MarkdownUtils } from "../utils";
import { createBasicFileTransformer } from "./createBasicTransformer";

export const createMarkdownFileTransformer = (
  options: {
    fileAdapter?: FileAdaptor;
  } = {}
) => {
  return createBasicFileTransformer(({ block }) => {
    const adapter = options.fileAdapter ?? new NoChangeFileObjectAdaptor();
    const { url } = adapter.execute(block.file);
    const caption =
      block.file.caption.length > 0
        ? MarkdownUtils.convertRichTextsToMarkdown(block.file.caption)
        : block.file.name;
    return MarkdownUtils.link(caption, url);
  });
};
