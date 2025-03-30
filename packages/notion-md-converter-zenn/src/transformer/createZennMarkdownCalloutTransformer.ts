import { MarkdownUtils, createCalloutTransformerFactory } from "@notion-md-converter/core";
import type { ApiColor, CalloutTransformer } from "@notion-md-converter/core/types";
import { ZennMarkdownUtils } from "../utils";

export const createZennMarkdownCalloutTransformer = (
  options: {
    alertColors?: ApiColor[];
  } = {
    alertColors: ["red", "red_background"],
  },
): CalloutTransformer => {
  return createCalloutTransformerFactory(({ block, children, context }) => {
    const text = context.tools.richTextFormatter.format(block.callout.rich_text);
    const color = block.callout.color;

    let result = text;
    if (children !== "") {
      result += `\n${children}`;
    }

    const isAlert = options.alertColors?.includes(color);
    return MarkdownUtils.wrapWithNewLines(ZennMarkdownUtils.message(result, isAlert));
  });
};
