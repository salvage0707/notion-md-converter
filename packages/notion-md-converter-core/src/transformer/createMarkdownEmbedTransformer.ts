import { MarkdownUtils, TransformerUtils } from "../utils";
import { createBasicEmbedTransformer } from "./createBasicTransformer";

export const createMarkdownEmbedTransformer = () => {
  return createBasicEmbedTransformer(({ block }) => {
    const caption = TransformerUtils.getCaptionText(block.embed.caption);
    const url = block.embed.url;
    return MarkdownUtils.link(caption || url, url);
  });
};
