import {
  MarkdownUtils,
  createImageTransformerFactory,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter, ImageTransformer } from "@notion-md-converter/core/types";

type ZennImageMetadata = {
  width: string | undefined;
};

export const createZennMarkdownImageTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): ImageTransformer => {
  return createImageTransformerFactory(({ block, captionMetadata, context }) => {
    const metadata: ZennImageMetadata = {
      width: captionMetadata.getMetadataValue("width"),
    };

    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.image);
    if (block.image.caption.length > 0) {
      const caption = context.tools.richTextFormatter.format(captionMetadata.getText());
      return MarkdownUtils.image(caption ?? url, url, metadata);
    }
    return MarkdownUtils.image(url, url, metadata);
  });
};
