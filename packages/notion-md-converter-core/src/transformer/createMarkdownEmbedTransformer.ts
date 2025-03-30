import {
  MarkdownUtils,
  ProviderUtils,
  type SupportedEmbedProviders,
} from "../utils";
import { createEmbedTransformerFactory } from "./transformerFactory";

type EmbedTransformerOptions = {
  enableEmbed?: boolean;
  supportedEmbedProviders?: SupportedEmbedProviders;
};

export const createMarkdownEmbedTransformer = (options: EmbedTransformerOptions = {}) => {
  const { enableEmbed = true, supportedEmbedProviders } = options;

  return createEmbedTransformerFactory(({ block, captionMetadata, context }) => {
    if (enableEmbed && supportedEmbedProviders) {
      const result = ProviderUtils.embedByUrl(block.embed.url, captionMetadata, {
        supportedEmbedProviders,
      });
      if (result) {
        return result;
      }
    }

    const caption = context.tools.richTextFormatter.format(captionMetadata.getText());
    const url = block.embed.url;
    return MarkdownUtils.link(caption || url, url);
  });
};
