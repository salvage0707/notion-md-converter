import { ProviderUtils, createEmbedTransformerFactory } from "@notion-md-converter/core";
import type { EmbedTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

export const createQiitaMarkdownEmbedTransformer = (): EmbedTransformer => {
  return createEmbedTransformerFactory(({ block, captionMetadata }) => {
    const url = block.embed.url;
    const provider = ProviderUtils.getType(url);
    if (provider === "codepen") {
      return QiitaMarkdownUtils.embedCodePen(url, {
        height: captionMetadata.getMetadataValue("height"),
        defaultTab: captionMetadata.getMetadataValue("defaultTab"),
      });
    }
    if (provider === "figma") {
      return QiitaMarkdownUtils.embedFigma(url, {
        height: captionMetadata.getMetadataValue("height"),
        width: captionMetadata.getMetadataValue("width"),
      });
    }
    if (provider === "google-slide") {
      return QiitaMarkdownUtils.embedGoogleSlide(url, {
        height: captionMetadata.getMetadataValue("height"),
        width: captionMetadata.getMetadataValue("width"),
      });
    }
    if (provider === "youtube") {
      return QiitaMarkdownUtils.embedYoutube(url, {
        height: captionMetadata.getMetadataValue("height"),
        width: captionMetadata.getMetadataValue("width"),
      });
    }
    if (provider === "speaker-deck" && captionMetadata.getMetadataValue("id")) {
      return QiitaMarkdownUtils.embedSpeakerDeck(captionMetadata.getMetadataValue("id") as string);
    }

    const { result, isEmbed } = QiitaMarkdownUtils.embedByURL(url);
    if (isEmbed) {
      return result;
    }

    return QiitaMarkdownUtils.linkCard(url);
  });
};
