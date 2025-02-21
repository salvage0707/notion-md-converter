import {
  MarkdownUtils,
  TransformerUtils,
  createBasicEmbedTransformer,
} from "@notion-md-converter/core";
import type { EmbedTransformer } from "@notion-md-converter/core/types";
import type { EmbedByUrlOptions } from "../utils";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownEmbedTransformer = (): EmbedTransformer => {
  return createBasicEmbedTransformer(({ block, metadata }) => {
    const getOptions = () => {
      const options: EmbedByUrlOptions = {};
      if (metadata.speakerDeck) {
        options.speakerDeckId = metadata.speakerDeck.id;
      }
      return options;
    };

    const url = block.embed.url;
    const options = getOptions();
    const { result, isEmbed } = ZennMarkdownUtils.embedByURL(url, options);
    if (isEmbed) {
      return result;
    }
    const caption = TransformerUtils.getCaptionText(block.embed.caption);
    return MarkdownUtils.link(caption || url, url);
  });
};
