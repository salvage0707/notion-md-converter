import { MarkdownUtils, createQuoteTransformerFactory } from "@notion-md-converter/core";
import { HatenaBlogMarkdownUtils } from "../utils";

export const createHatenaBlogMarkdownQuoteTransformer = () => {
  return createQuoteTransformerFactory(({ block, children, context }) => {
    const text = context.tools.richTextFormatter.format(block.quote.rich_text);
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }
    return MarkdownUtils.wrapWithNewLines(HatenaBlogMarkdownUtils.blockquote(result));
  });
};
