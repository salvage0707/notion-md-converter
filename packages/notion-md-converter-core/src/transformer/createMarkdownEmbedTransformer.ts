import {
  MarkdownUtils,
  ProviderUtils,
  type SupportedEmbedProviders,
  TransformerUtils,
} from "../utils";
import { createEmbedTransformerFactory } from "./transformerFactory";

type EmbedTransformerOptions = {
  enableEmbed?: boolean;
  supportedEmbedProviders?: SupportedEmbedProviders;
};

export const createMarkdownEmbedTransformer = (options: EmbedTransformerOptions = {}) => {
  const { enableEmbed = true, supportedEmbedProviders } = options;

  return createEmbedTransformerFactory(({ block, metadata, context }) => {
    if (enableEmbed && supportedEmbedProviders) {
      const result = ProviderUtils.embedByUrl(block.embed.url, metadata, {
        supportedEmbedProviders,
      });
      if (result) {
        return result;
      }
    }

    const extractedMetadataRichText = TransformerUtils.getExtractedMetadataRichText(
      block.embed.caption,
    );
    const caption = context.tools.richTextFormatter.format(extractedMetadataRichText);
    const url = block.embed.url;
    return MarkdownUtils.link(caption || url, url);
  });
};
