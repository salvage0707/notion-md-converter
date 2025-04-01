import type { FileAdapter } from "@notion-md-converter/types";
import { createNoChangeFileObjectAdapter } from "../adapter";
import { HTMLUtils, MarkdownUtils } from "../utils";
import { createVideoTransformerFactory } from "./transformerFactory";

export const createMarkdownVideoTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createVideoTransformerFactory(({ block, captionMetadata }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.video);
    return MarkdownUtils.wrapWithNewLines(
      HTMLUtils.videoTag({ src: url, ...captionMetadata.getMetadata() }),
    );
  });
};
