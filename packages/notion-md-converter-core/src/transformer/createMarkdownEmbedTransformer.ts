import { MarkdownUtils, TransformerUtils } from "../utils";
import { createEmbedTransformerFactory } from "./transformerFactory";

export const createMarkdownEmbedTransformer = () => {
  return createEmbedTransformerFactory(({ block }) => {
    const caption = TransformerUtils.getCaptionText(block.embed.caption);
    const url = block.embed.url;
    return MarkdownUtils.link(caption || url, url);
  });
};
