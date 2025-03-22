import { type ColorMap, type EnableAnnotations, MarkdownUtils } from "../utils";
import { createCalloutTransformerFactory } from "./transformerFactory";

type CalloutTransformerOptions = {
  enableAnnotations?: EnableAnnotations;
  colorMap?: ColorMap;
};

export const createMarkdownCalloutTransformer = (options: CalloutTransformerOptions = {}) => {
  return createCalloutTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(
      block.callout.rich_text,
      options.enableAnnotations,
      options.colorMap,
    );
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.blockquote(result));
  });
};
