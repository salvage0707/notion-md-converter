import type { FileAdapter } from "@notion-md-converter/types";
import { createNoChangeFileObjectAdapter } from "../adapter";
import { MarkdownUtils } from "../utils";
import { createVideoTransformerFactory } from "./transformerFactory";

export const createMarkdownVideoTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createVideoTransformerFactory(({ block }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.video);
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.video(url));
  });
};
