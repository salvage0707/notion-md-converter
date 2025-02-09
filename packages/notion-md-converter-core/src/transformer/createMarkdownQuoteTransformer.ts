import { MarkdownUtils } from "../utils";
import { createBasicQuoteTransformer } from "./createBasicTransformer";

export const createMarkdownQuoteTransformer = () => {
  return createBasicQuoteTransformer(({ block, children }) => {
    const text = MarkdownUtils.convertRichTextsToMarkdown(block.quote.rich_text);
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.convertToBlockquote(result));
  });
};
