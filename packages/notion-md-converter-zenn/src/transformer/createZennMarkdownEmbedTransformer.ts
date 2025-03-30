import { MarkdownUtils, createEmbedTransformerFactory } from "@notion-md-converter/core";
import type { EmbedTransformer } from "@notion-md-converter/core/types";
import type { EmbedByUrlOptions } from "../utils";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownEmbedTransformer = (): EmbedTransformer => {
  return createEmbedTransformerFactory(({ block, captionMetadata, context }) => {
    const getOptions = () => {
      const options: EmbedByUrlOptions = {};
      if (captionMetadata.getMetadataValue("id")) {
        options.speakerDeckId = captionMetadata.getMetadataValue("id");
      }
      return options;
    };

    const url = block.embed.url;
    const options = getOptions();
    const { result, isEmbed } = ZennMarkdownUtils.embedByURL(url, options);
    if (isEmbed) {
      return result;
    }
    const caption = context.tools.richTextFormatter.format(captionMetadata.getText());
    return MarkdownUtils.link(caption || url, url);
  });
};
