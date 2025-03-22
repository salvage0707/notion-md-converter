import { createEmbedTransformerFactory, ProviderUtils } from "@notion-md-converter/core";
import type { EmbedTransformer } from "@notion-md-converter/core/types";
import { QiitaMarkdownUtils } from "../utils";

export const createQiitaMarkdownEmbedTransformer = (): EmbedTransformer => {
  return createEmbedTransformerFactory(({ block, metadata }) => {
    const url = block.embed.url;
    const provider = ProviderUtils.getType(url);
    if (provider === "codepen") {
      return QiitaMarkdownUtils.embedCodePen(url, {
        height: metadata.height,
        defaultTab: metadata.defaultTab,
      });
    }
    if (provider === "figma") {
      return QiitaMarkdownUtils.embedFigma(url, {
        height: metadata.height,
        width: metadata.width,
      });
    }
    if (provider === "google-slide") {
      return QiitaMarkdownUtils.embedGoogleSlide(url, {
        height: metadata.height,
        width: metadata.width,
      });
    }
    if (provider === "youtube") {
      return QiitaMarkdownUtils.embedYoutube(url, {
        height: metadata.height,
        width: metadata.width,
      });
    }
    if (provider === "speaker-deck" && metadata.id) {
      return QiitaMarkdownUtils.embedSpeakerDeck(metadata.id);
    }

    const { result, isEmbed } = QiitaMarkdownUtils.embedByURL(url);
    if (isEmbed) {
      return result;
    }

    return QiitaMarkdownUtils.linkCard(url);
  });
};
