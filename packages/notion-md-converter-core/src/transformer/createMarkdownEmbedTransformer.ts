import {
  type ColorMap,
  type EnableAnnotations,
  type SupportedEmbedProviders,
  MarkdownUtils,
  ProviderUtils,
  TransformerUtils,
} from "../utils";
import { createEmbedTransformerFactory } from "./transformerFactory";

type EmbedTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
  enableEmbed?: boolean;
  supportedEmbedProviders?: SupportedEmbedProviders;
};

export const createMarkdownEmbedTransformer = (options: EmbedTransformerOptions = {}) => {
  const { enableAnnotations, colorMap, enableEmbed = true, supportedEmbedProviders } = options;
  
  return createEmbedTransformerFactory(({ block, metadata }) => {
    if (enableEmbed && supportedEmbedProviders) {
      const result = ProviderUtils.embedByUrl(block.embed.url, metadata, {
        supportedEmbedProviders,
      });
      if (result) {
        return result;
      }
    }

    const caption = TransformerUtils.getCaptionText(block.embed.caption, {
      enableAnnotations,
      colorMap,
    });
    const url = block.embed.url;
    return MarkdownUtils.link(caption || url, url);
  });
};
