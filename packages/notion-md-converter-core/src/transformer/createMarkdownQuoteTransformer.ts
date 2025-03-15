import { MarkdownUtils } from "../utils";
import { createQuoteTransformerFactory } from "./transformerFactory";

export const createMarkdownQuoteTransformer = () => {
  return createQuoteTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.quote.rich_text);
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.blockquote(result));
  });
};
