import { type ColorMap, type EnableAnnotations, MarkdownUtils, TransformerUtils } from "../utils";
import { createEmbedTransformerFactory } from "./transformerFactory";

type EmbedTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownEmbedTransformer = (options: EmbedTransformerOptions = {}) => {
  const { enableAnnotations, colorMap } = options;
  return createEmbedTransformerFactory(({ block }) => {
    const caption = TransformerUtils.getCaptionText(block.embed.caption, {
      enableAnnotations,
      colorMap,
    });
    const url = block.embed.url;
    return MarkdownUtils.link(caption || url, url);
  });
};
