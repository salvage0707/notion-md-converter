import { createNoChangeFileObjectAdapter } from "../adapter";
import type { FileAdapter } from "../types";
import { MarkdownUtils } from "../utils";
import { createBasicVideoTransformer } from "./createBasicTransformer";

export const createMarkdownVideoTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createBasicVideoTransformer(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.video);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.video(url));
  });
};
