import { type ColorMap, type EnableAnnotations, MarkdownUtils } from "../utils";
import { createQuoteTransformerFactory } from "./transformerFactory";

type QuoteTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownQuoteTransformer = (options: QuoteTransformerOptions = {}) => {
  const { enableAnnotations, colorMap } = options;
  return createQuoteTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(
      block.quote.rich_text,
      enableAnnotations,
      colorMap,
    );
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.blockquote(result));
  });
};
