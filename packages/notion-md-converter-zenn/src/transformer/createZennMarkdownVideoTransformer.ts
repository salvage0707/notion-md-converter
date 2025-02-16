import {
  MarkdownUtils,
  createBasicVideoTransformer,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter, VideoTransformer } from "@notion-md-converter/core/types";

export const createZennMarkdownVideoTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): VideoTransformer => {
  return createBasicVideoTransformer(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.video);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.video(url));
  });
};
