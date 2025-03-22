import { type ColorMap, type EnableAnnotations, type EnableEmbed, MarkdownUtils, ProviderUtils, TransformerUtils } from "../utils";
import { createEmbedTransformerFactory } from "./transformerFactory";

type EmbedTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
  enableEmbed?: EnableEmbed;
};

export const createMarkdownEmbedTransformer = (options: EmbedTransformerOptions = {}) => {
  const { enableAnnotations, colorMap, enableEmbed } = options;
  return createEmbedTransformerFactory(({ block, providerType, metadata }) => {
    if (enableEmbed && providerType && enableEmbed[providerType]) {
      const result = ProviderUtils.embedByUrl(block.embed.url, metadata, { enableEmbed });
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
