import {
  MarkdownUtils,
  createBasicVideoTransformer,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter } from "@notion-md-converter/core/types";

export const createZennMarkdownVideoTransformer = (
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
