import { MarkdownUtils } from "../utils";
import { createCalloutTransformerFactory } from "./transformerFactory";

export const createMarkdownCalloutTransformer = () => {
  return createCalloutTransformerFactory(({ block, children, context }) => {
    const text = context.tools.richTextFormatter.format(block.callout.rich_text);
    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }
    return MarkdownUtils.wrapWithNewLines(MarkdownUtils.blockquote(result));
  });
};
