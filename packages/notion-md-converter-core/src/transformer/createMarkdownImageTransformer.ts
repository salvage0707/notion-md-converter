import type { FileAdapter } from "@notion-md-converter/types";
import { createNoChangeFileObjectAdapter } from "../adapter";
import { MarkdownUtils } from "../utils";
import { createImageTransformerFactory } from "./transformerFactory";

export const createMarkdownImageTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
) => {
  return createImageTransformerFactory(({ block, context }) => {
    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.image);
    const caption =
      block.image.caption.length > 0
        ? context.tools.richTextFormatter.format(block.image.caption)
        : url;
    return MarkdownUtils.image(caption ?? url, url);
  });
};
