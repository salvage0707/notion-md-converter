import type { FileAdaptor } from "../adaptors";
import { NoChangeFileObjectAdaptor } from "../adaptors";
import { MarkdownUtils } from "../utils";
import { createBasicVideoTransformer } from "./createBasicTransformer";

export const createMarkdownVideoTransformer = (
  options: {
    fileAdaptor?: FileAdaptor;
  } = {}
) => {
  return createBasicVideoTransformer(({ block }) => {
    const adaptor = options.fileAdaptor ?? new NoChangeFileObjectAdaptor();
    const { url } = adaptor.execute(block.video);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.video(url));
  });
};
