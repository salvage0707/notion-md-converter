import { MarkdownUtils, createQuoteTransformerFactory } from "@notion-md-converter/core";
import { HatenaBlogMarkdownUtils } from "../utils";

export const createHatenaBlogMarkdownQuoteTransformer = () => {
  return createQuoteTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(
      block.quote.rich_text,
      {
        color: true,
      }
    );
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }
    return MarkdownUtils.wrapWithNewLines(HatenaBlogMarkdownUtils.blockquote(result));
  });
};
