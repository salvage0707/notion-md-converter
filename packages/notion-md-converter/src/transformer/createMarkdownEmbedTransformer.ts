import { MarkdownUtils } from "../utils";
import { createBasicEmbedTransformer } from "./createBasicTransformer";

export const createMarkdownEmbedTransformer = () => {
  return createBasicEmbedTransformer(({ block }) => {
    const caption = MarkdownUtils.convertRichTextsToMarkdown(
      block.embed.caption
    );
    const url = block.embed.url;
    return MarkdownUtils.convertToLink(caption || url, url);
  });
};
