import { type ColorMap, type EnableAnnotations, MarkdownUtils } from "../utils";
import { createParagraphTransformerFactory } from "./transformerFactory";

type ParagraphTransformerOptions = {
  br?: boolean;
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownParagraphTransformer = (options: ParagraphTransformerOptions = {}) => {
  const { br = false, enableAnnotations, colorMap } = options;

  return createParagraphTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(
      block.paragraph.rich_text,
      enableAnnotations,
      colorMap,
    );
    const convertedMarkdown = children !== "" ? `${text}\n${children}` : text;
    return br ? `${convertedMarkdown}<br />` : convertedMarkdown;
  });
};
