import type { FileAdaptor } from "../adaptors";
import { NoChangeFileObjectAdaptor } from "../adaptors";
import { MarkdownUtils } from "../utils";
import { createBasicImageTransformer } from "./createBasicTransformer";

export const createMarkdownImageTransformer = (
  options: {
    fileAdaptor?: FileAdaptor;
  } = {},
) => {
  return createBasicImageTransformer(({ block }) => {
    const adapter = options.fileAdaptor ?? new NoChangeFileObjectAdaptor();
    const { url } = adapter.execute(block.image);
    const caption =
      block.image.caption.length > 0 ? MarkdownUtils.richTextsToMarkdown(block.image.caption) : url;
    return MarkdownUtils.image(caption ?? url, url);
  });
};
