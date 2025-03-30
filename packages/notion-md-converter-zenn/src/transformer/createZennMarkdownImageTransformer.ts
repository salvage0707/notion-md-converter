import {
  MarkdownUtils,
  TransformerUtils,
  createImageTransformerFactory,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter, ImageTransformer } from "@notion-md-converter/core/types";

type ZennImageMetadata = {
  width?: string;
};

export const createZennMarkdownImageTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): ImageTransformer => {
  return createImageTransformerFactory(({ block, metadata, context }) => {
    const { width } = metadata as ZennImageMetadata;

    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.image);
    if (block.image.caption.length > 0) {
      const extractedMetadataRichText = TransformerUtils.getExtractedMetadataRichText(block.image.caption);
      const caption = context.tools.richTextFormatter.format(extractedMetadataRichText);
      return MarkdownUtils.image(caption ?? url, url, { width });
    }
    return MarkdownUtils.image(url, url, { width });
  });
};
