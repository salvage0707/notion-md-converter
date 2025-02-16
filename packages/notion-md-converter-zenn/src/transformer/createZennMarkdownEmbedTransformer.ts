import { MarkdownUtils, createBasicEmbedTransformer } from "@notion-md-converter/core";
import type { EmbedBlock, EmbedTransformer } from "@notion-md-converter/core/types";
import type { EmbedByUrlOptions } from "../utils";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownEmbedTransformer = (): EmbedTransformer => {
  return createBasicEmbedTransformer(({ block }) => {
    const getOptions = (block: EmbedBlock) => {
      const urlObj = new URL(block.embed.url);
      const options: EmbedByUrlOptions = {};
      if (urlObj.hostname === "speakerdeck.com") {
        const speakerDeckId = MarkdownUtils.richTextsToMarkdown(block.embed.caption, {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
        });
        options.speakerDeckId = speakerDeckId;
      }
      return options;
    };

    const url = block.embed.url;
    const options = getOptions(block);
    const { result, isEmbed } = ZennMarkdownUtils.embedByURL(url, options);
    if (isEmbed) {
      return result;
    }
    const caption = MarkdownUtils.richTextsToMarkdown(block.embed.caption);
    return MarkdownUtils.link(caption || url, url);
  });
};
