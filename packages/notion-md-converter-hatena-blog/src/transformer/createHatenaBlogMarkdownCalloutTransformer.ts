import { MarkdownUtils, createCalloutTransformerFactory } from "@notion-md-converter/core";
import { HatenaBlogMarkdownUtils } from "../utils";

export const createHatenaBlogMarkdownCalloutTransformer = () => {
  return createCalloutTransformerFactory(({ block, children }) => {
    const text = MarkdownUtils.richTextsToMarkdown(block.callout.rich_text, {
      color: true,
    });
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }
    return MarkdownUtils.wrapWithNewLines(HatenaBlogMarkdownUtils.blockquote(result));
  });
};
