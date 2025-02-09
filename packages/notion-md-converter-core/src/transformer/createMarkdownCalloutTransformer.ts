import { MarkdownUtils } from "../utils";
import { createBasicCalloutTransformer } from "./createBasicTransformer";

export const createMarkdownCalloutTransformer = () => {
  return createBasicCalloutTransformer(({ block, children }) => {
    const text = MarkdownUtils.convertRichTextsToMarkdown(block.callout.rich_text);
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }
    return MarkdownUtils.wrapWithNewLines(
      MarkdownUtils.convertToBlockquote(result)
    );
  });
};
