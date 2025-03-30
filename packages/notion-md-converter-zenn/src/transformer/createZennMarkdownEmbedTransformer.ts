import {
  MarkdownUtils,
  TransformerUtils,
  createEmbedTransformerFactory,
} from "@notion-md-converter/core";
import type { EmbedTransformer } from "@notion-md-converter/core/types";
import type { EmbedByUrlOptions } from "../utils";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownEmbedTransformer = (): EmbedTransformer => {
  return createEmbedTransformerFactory(({ block, metadata, context }) => {
    const getOptions = () => {
      const options: EmbedByUrlOptions = {};
      if (metadata.id) {
        options.speakerDeckId = metadata.id;
      }
      return options;
    };

    const url = block.embed.url;
    const options = getOptions();
    const { result, isEmbed } = ZennMarkdownUtils.embedByURL(url, options);
    if (isEmbed) {
      return result;
    }
    const extractedMetadataRichText = TransformerUtils.getExtractedMetadataRichText(block.embed.caption);
    const caption = context.tools.richTextFormatter.format(extractedMetadataRichText);
    return MarkdownUtils.link(caption || url, url);
  });
};
